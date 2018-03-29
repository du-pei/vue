<template>
	<div>
		<treeGrid ref="treeGrid" :columns='columns' :items='items' :expanded='true'>
			<template slot="buttons">
				<el-button size="medium" type="primary" class="el-icon-refresh" @click="onRefresh">刷新</el-button>
				<el-button size="medium" type="primary" class="el-icon-add" @click="onCreate">添加</el-button>
				<el-button size="medium" type="primary" class="el-icon-edit" @click="onEdit">修改</el-button>
				<el-button size="medium" type="danger" class="el-icon-delete" @click="onDelete">删除</el-button>
			</template>
		</treeGrid>
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='callOf'>
			<edit ref="edit" :collectionName='collectionName' v-if="dialogFormVisible" :form="form"></edit>
			<div slot="footer" class="dialog-footer">
				<el-button @click="callOf">取 消</el-button>
				<el-button v-if="form.id == 0" type="primary" @click="saveData" v-loading="loading">确 定</el-button>
				<el-button v-else type="primary" @click="editDatas" v-loading="loading">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
//import { saveData, editData, deleteData, getTreeData, getDataById } from '@/api/mainData';
import { saveMenu, getMenuTreeData, deleteMenu, getMenuById } from '@/api/menu';
import edit from './menuEdit';
export default {
	data() {
		return {
			columns: [
				{ title: '显示名称', key: 'displayName', treeField: true, width: '50', align: 'left' },
				{ title: '名称', key: 'name', width: '50', align: 'center' },
				{ title: '图标', key: 'icon', width: '50', align: 'left' },
				{ title: '地址', key: 'url', width: '50', align: 'left' },
				//{ title: '父级Id', key: 'parentId', width: '50', align: 'center' },
				//{ title: '父路径', key: 'parentIds', width: '50', align: 'center' },
				{ title: '排序', key: 'sort', width: '50', align: 'center' },
				//{ title: '类型', key: 'type', width: '50', align: 'center' },
				{
					title: '创建时间',
					key: 'customData',
					formatter: value => {
						return this.$fmtData(value, 'yyyy-MM-dd hh:mm:ss');
					},
					width: '50',
					align: 'center'
				},
				{
					title: '是否启用',
					key: 'isActive',
					width: '50',
					align: 'center',
					formatter: value => {
						return value ? '是' : '否';
					}
				},
				{
					title: '是否系统',
					key: 'isStatic',
					width: '50',
					align: 'center',
					formatter: value => {
						return value ? '是' : '否';
					}
				}
			],
			items: [],
			collectionName: 'meuns',
			dialogFormVisible: false,
			form: {
				id: 0,
				displayName: '',
				name: '',
				url: '',
				parentIds: '',
				sort: 0,
				type: '',
				customData: new Date(),
				isActive: true,
				icon: '',
				isStatic: false,
				parentId: ''
			},
			title: '',
			loading: false
		};
	},
	components: {
		edit
	},
	created() {
		//console.log(this.collectionName);
		//this.getTreeData(this.collectionName);
	},
	mounted() {
		this.getTreeData();
	},
	methods: {
		getTreeData() {
			getMenuTreeData().then(res => {
				this.items = res;
			});
		},
		onRefresh() {
			this.getTreeData();
		},
		onCreate() {
			const row = this.$refs.treeGrid.getSelected();
			this.title = '添加';
			this.dialogFormVisible = true;
			this.form = {};
			this.form.isActive = true;
			this.form.customData = new Date();
			this.form.parentId = row != null ? row.id : '';
		},
		callOf() {
			this.dialogFormVisible = false;
			this.resetFormValue();
		},
		saveData() {
			this.loading = true;
			const data = this.form;
			data.isStatic = false;
			saveMenu(data)
				.then(res => {
					if (res.success) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.dialogFormVisible = false;
						this.resetFormValue();
						this.getTreeData();
					}
				})
				.catch(result => {
					this.$message({
						message: (result && result.error && result.error.message) || '保存失败！',
						type: 'error'
					});
				});
			this.loading = false;
		},
		onEdit() {
			const row = this.$refs.treeGrid.getSelected();
			if (row == null) {
				this.$message({
					type: 'info',
					message: '请选择数据进行修改'
				});
			}
			getMenuById(row.id).then(res => {
				if (res.success) {
					this.form = res.result;
					this.dialogFormVisible = true;
				} else {
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
				}
			});
		},
		onDelete() {
			const data = this.$refs.treeGrid.getSelected();
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteMenu(data.id)
						.then(data => {
							console.log(data);
							if (data && data.success) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.getTreeData(this.collectionName);
							}
						})
						.catch(result => {
							this.$message({
								type: 'error',
								message: (result && result.error && result.error.message) || '操作失败！'
							});
						});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		editDatas() {
			this.loading = true;
			const data = this.form;
			console.log(data);
			saveMenu(data)
				.then(res => {
					if (res.success) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.resetFormValue();
						this.dialogFormVisible = false;
						this.loading = false;
						this.getTreeData(this.collectionName);
					}
				})
				.catch(result => {
					console.log(result);
					this.$message({
						message: (result && result.error && result.error.message) || '保存失败！',
						type: 'error'
					});
				});
		},
		resetFormValue() {
			this.$refs.edit.resetForm();
		},
		test(obj) {
			console.log(11);
			try {
				const a = 'ok';
				obj.success && obj.success.call(this, a);
			} catch (error) {
				const b = 'error';
				obj.error && obj.error.call(this, b, error);
			}
		},
		callTest() {
			this.test({
				success: results => {
					console.log(results);
				},
				error: (res, err) => {
					console.log(res);
				}
			});
		}
	}
};
</script>


