<template>
	<div>
		<div class="tree_left">
			<el-tree :data="treeData" :default-expand-all=true :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		</div>
		<div class="grid_right">
			<grid ref="list" :searchApi="searchApi" :height="height" :params="params">
				<template slot="buttons">
					<el-button size="medium" type="primary" class="el-icon-refresh" @click="onRefresh">刷新</el-button>
					<el-button size="medium" type="primary" class="el-icon-circle-plus-outline" @click="onCreate">添加</el-button>
				</template>
				<template slot="columns">
					<el-table-column fixed type=index label="序号" align="center" width="70">
					</el-table-column>
					<el-table-column fixed prop="attributes.text" align="center" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="attributes.value" align="center" label="值" width="180"></el-table-column>
					<el-table-column align="center" label="是否启用" width="180">
						<template slot-scope="scope">
							<span>{{$fmtBool(scope.row.attributes.isUse)}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="是否系统" width="180">
						<template slot-scope="scope">
							<span>{{$fmtBool(scope.row.attributes.isStatic)}}</span>
						</template>
					</el-table-column>
					<el-table-column width="260" align="center" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" class="el-icon-edit" @click="onEdit(scope.$index, scope.row)">修改
							</el-button>
							<el-button size="mini" type="danger" class="el-icon-delete" @click="onDelete(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</template>
			</grid>
			<el-dialog :title="title" :visible.sync="dialogFormVisible">
				<edit ref="edit" v-if="dialogFormVisible" :form="form"></edit>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button v-if="form.id == 0" type="primary" @click="saveData" v-loading="loading">确 定</el-button>
					<el-button v-else type="primary" @click="editDatas" v-loading="loading">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import { getData, saveData, editData, deleteData } from '@/api/index';
import { getGroupTreeData } from '@/api/groupServer';
import edit from './dictionaryEdit';
export default {
	data() {
		return {
			cName: 'items',
			searchApi: getData,
			groupId: '',
			params: { collectionName: this.cName, param: { equalTo: [{ key: 'groupId', value: this.groupId }] } },
			dialogFormVisible: false,
			loading: false,
			treeData: [],
			defaultProps: {
				children: 'children',
				label: 'displayName'
			},
			height: '500',
			title: '',
			form: {
				id: 0,
				text: '',
				value: '',
				isUse: true,
				isStatic: false,
				groupId: ''
			}
		};
	},
	components: {
		edit
	},
	created() {
		this.getTreeData();
		this.params = { collectionName: this.cName, param: { equalTo: [{ key: 'groupId', value: this.groupId }] } };
	},
	methods: {
		getTreeData() {
			getGroupTreeData().then(res => {
				this.treeData = res.result;
			});
		},
		onRefresh() {
			this.$refs.list.onSearch(this.params);
		},
		handleNodeClick(data) {
			this.groupId = data.id;
			this.$set(this.params, 'param', { equalTo: [{ key: 'groupId', value: this.groupId }] });
			//this.params = { collectionName: this.cName, param: { equalTo: [{ key: 'groupId', value: data.id }] } };
			this.$refs.list.onSearch(this.params);
		},
		onCreate() {
			if (this.groupId == '') {
				this.$message({
					message: '请选择左侧进行添加',
					type: 'error'
				});
				return;
			}
			this.title = '添加';
			this.dialogFormVisible = true;
			this.form.groupId = this.groupId;
		},
		saveData() {
			this.loading = true;
			const data = this.form;
			saveData(this.cName, data)
				.then(res => {
					console.log(res);
					if (res.success) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.$refs.list.onSearch(this.params);
						this.resetFormValue();
					}
				})
				.catch(result => {
					console.log(result);
					this.$message({
						message: (result && result.error && result.error.message) || '保存失败！',
						type: 'error'
					});
				});
			this.dialogFormVisible = false;
			this.loading = false;
		},
		onEdit(index, row) {
			this.title = '修改';
			this.form.id = row.id;
			this.form.text = row.attributes.text;
			this.form.value = row.attributes.value;
			this.form.isUse = row.attributes.isUse;
			this.form.groupId = row.attributes.groupId;
			this.form.isStatic = row.attributes.isStatic;
			this.dialogFormVisible = true;
		},
		onDelete(index, row) {
			const data = row;
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteData(this.cName, data)
						.then(data => {
							if (data && data.success) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.$refs.list.onSearch(this.params);
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
			editData(this.cName, data)
				.then(res => {
					console.log(res);
					if (res.success) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.$refs.list.onSearch(this.params);
						this.resetFormValue();
						this.dialogFormVisible = false;
						this.loading = false;
					}
				})
				.catch(result => {
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

<style>
.tree_left {
	float: left;
	width: 21%;
}
.grid_right {
	float: left;
	width: 70%;
	border-left: solid 1px #eff2f6;
}
</style>
