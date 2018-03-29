<template>
	<div>
		<grid ref="list" :searchApi="searchApi" :height="height" :params="params">
			<template slot="buttons">
				<el-button size="medium" type="primary" class="el-icon-refresh" @click="onRefresh">刷新</el-button>
				<el-button size="medium" type="primary" class="el-icon-circle-plus-outline" @click="onCreate">添加</el-button>
			</template>
			<template slot="columns">
				<el-table-column type=index label="序号" align="center" width="70">
				</el-table-column>
				<el-table-column prop="attributes.name" align="center" label="项目名" width="180"></el-table-column>
				<el-table-column prop="attributes.text" align="center" label="名称" width="180"></el-table-column>
				<el-table-column prop="attributes.score" align="center" label="分数" width="180"></el-table-column>
				<el-table-column width="260" align="center" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="" @click="onEdit(scope.$index, scope.row)">修改
						</el-button>
						<el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</template>
		</grid>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<edit ref="edit" v-if="dialogFormVisible" :form="form"></edit>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button v-if="form.id ==0" type="primary" @click="saveData" v-loading="loading">确 定</el-button>
				<el-button v-if="form.id.length>0" type="primary" @click="editDatas" v-loading="loading">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getData, saveScore, editData, deleteData } from '@/api/index';
import edit from './scoreEdit';
export default {
	data() {
		return {
			searchApi: getData,
			params: { collectionName: 'GameScore' },
			height: '500',
			dialogFormVisible: false,
			form: {
				id: 0,
				name: '',
				text: '',
				score: ''
			},
			title: '',
			loading: false
		};
	},
	components: {
		edit
	},
	methods: {
		onRefresh() {
			this.$refs.list.onSearch(this.params);
		},
		onCreate() {
			this.title = '添加';
			this.dialogFormVisible = true;
		},
		saveData() {
			this.loading = true;
			const data = this.form;
			const score = parseInt(this.form.score);
			data.score = score;
			saveScore('GameScore', data)
				.then(res => {
					if (res.id.length > 0) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.$refs.list.onSearch();
						this.resetFormValue();
					}
				})
				.catch(result => {
					this.$message({
						message: (result && result.error && result.error.message) || '保存失败！',
						type: 'error'
					});
				});
			this.dialogFormVisible = false;
			this.loading = false;
		},
		onEdit(index, row) {
			this.form.id = row.id;
			this.form.name = row.attributes.name;
			this.form.score = row.attributes.score;
			this.form.text = row.attributes.text;
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
					deleteData('GameScore', data)
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
			const score = parseInt(this.form.score);
			if (!(score > 0)) {
				this.$message({
					message: '请输入数字',
					type: 'error'
				});
				this.loading = false;
				return;
			}
			data.score = score;
			editData('GameScore', data)
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