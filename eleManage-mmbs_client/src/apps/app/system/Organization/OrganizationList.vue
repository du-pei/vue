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
            <edit ref="edit" v-if="dialogFormVisible" :form="form"></edit>
            <div slot="footer" class="dialog-footer">
                <el-button @click="callOf">取 消</el-button>
                <el-button v-if="form.id == 0" type="primary" @click="saveData" v-loading="loading">确 定</el-button>
                <el-button v-else type="primary" @click="editDatas" v-loading="loading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { saveData, editData, deleteData, getTreeData } from '@/api/index';
    import edit from './groupEdit';
    export default {
	data() {
		return {
			columns: [
				{ title: '名称', key: 'displayName', treeField: true, width: '50', align: 'left' },
				{ title: '部门名称', key: 'name', width: '50', align: 'center' },
				{ title: '排序', key: 'sort', width: '50', align: 'center' },
				{
					title: '是否系统',
					key: 'isStatic',
					width: '50',
					align: 'center',
					formatter: value => {
						return value ? '是' : '否';
					}
                },
                {
					title: '是否有效',
					key: 'isActive',
					width: '50',
					align: 'center',
					formatter: value => {
						return value ? '是' : '否';
					}
				}
			],
			items: [],
			collectionNames: 'organizations',
			dialogFormVisible: false,
			form: {
				id: 0,
				displayName: '',
				name: '',
				isStatic: false,
                parentId: '',
                nature: '',
                sort: 0,
                isActive: true
			},
			title: '',
			loading: false
		};
	},
	components: {
		edit
	},
	created() {
		this.getTreeData();
	},
	methods: {
		getTreeData() {
			getGroupTreeData().then(res => {
				this.items = res.result;
			});
		},
		onRefresh() {
			this.getTreeData();
		},
		onCreate() {
            this.form = {};
			const row = this.$refs.treeGrid.getSelected();
			this.title = '添加';
			this.dialogFormVisible = true;
			this.form.id = 0;
			this.form.displayName = '';
			this.form.name = '';
			this.form.sort = 0;
            this.form.parentId = row.id;
            this.form.isStatic = false;
            this.form.isActive = true;
			console.log(this.form);
		},
		callOf() {
			this.dialogFormVisible = false;
			this.resetFormValue();
		},
		saveData() {
			this.loading = true;
			const data = this.form;
			console.log(data);
			data.isStatic = false;
			//data.index = parseInt(this.form.index);
			saveData(this.collectionNames, data)
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
			this.form.id = row.id;
			this.form.displayName = row.displayName;
			this.form.name = row.name;
			this.form.sort = row.sort;
			this.form.parent = row.parent != null ? row.parent.id : '';
			this.dialogFormVisible = true;
		},
		onDelete() {
			const data = this.$refs.treeGrid.getSelected();
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteData(this.collectionNames, data)
						.then(data => {
							if (data && data.success) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.getTreeData();
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
			editData(this.collectionNames, data)
				.then(res => {
					if (res.success) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.resetFormValue();
						this.dialogFormVisible = false;
						this.loading = false;
						this.getTreeData();
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
		}
	}
};
</script>
