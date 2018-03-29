<template>
	<div>
		<grid ref="list" :searchApi="searchApi" :height="height" :params="params">
			<template slot="buttons">
				<el-button size="medium" type="primary" class="el-icon-refresh" @click="onRefresh">刷新</el-button>
				<el-button size="medium" type="primary" class="el-icon-circle-plus-outline" @click="onCreate">添加</el-button>
			</template>
			<template slot="columns">
				<el-table-column fixed type=index label="序号" align="center" width="70">
				</el-table-column>
				<el-table-column fixed prop="displayName" align="center" label="名称" width="180">
				</el-table-column>
				<el-table-column prop="userName" align="center" label="用户名" width="180"></el-table-column>
				<el-table-column prop="password" align="center" label="密码" width="180"></el-table-column>
				<el-table-column prop="mobilePhone" align="center" label="移动电话" width="180"></el-table-column>
				<el-table-column align="center" label="是否锁定" width="180">
					<template slot-scope="scope">
						<span>{{$fmtBool(scope.row.isLock)}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="是否启用" width="180">
					<template slot-scope="scope">
						<span>{{$fmtBool(scope.row.isActive)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="accessFailedCount" align="center" label="验证错误次数" width="180"></el-table-column>
				<el-table-column prop="lastLoginTime" align="center" label="最后登录时间">
				</el-table-column>
				<el-table-column fixed="right" width="260" align="center" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="" @click="onEdit(scope.$index, scope.row)">修改
						</el-button>
						<el-button size="mini" type="" @click="onChangePassword(scope.$index, scope.row)">修改密码</el-button>
						<el-button size="mini" type="" @click="onChangeRole()">查看角色</el-button>
						<el-button size="mini" type="" @click="onChangeOrg()">分配组织机构</el-button>
						<!-- <el-button size="mini" type="" @click="on">启用</el-button>
						<el-button size="mini" type="" @click="on">禁用</el-button> -->
						<el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</template>
		</grid>
		<!-- 修改用户 -->
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<edit v-if="dialogFormVisible" :form="form"></edit>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSave" v-loading="loading">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog :title="title" :visible.sync="dialogPasswordVisible">
			<changePassword ref="changePassword" v-if="dialogPasswordVisible" :form="changePassForm"></changePassword>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogPasswordVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSavePass" v-loading="loading">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 查看角色 -->
		<el-dialog :title="title" :visible.sync="dialogRoleVisible">
			<changeRole v-if="dialogRoleVisible" :form="form"></changeRole>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogRoleVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSave" v-loading="loading">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 分配组织机构 -->
		<el-dialog :title="title" :visible.sync="dialogOrgVisible">
			<changeOrg v-if="dialogOrgVisible" :form="form"></changeOrg>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogOrgVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSave" v-loading="loading">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { userList, addOrUpdateUser, deleteUser, changePass } from '@/api/mainData';
import edit from './edit';
import changeOrg from './changeOrg';
import changePassword from './changePassword';
import changeRole from './changeRole';
export default {
	data() {
		return {
			searchApi: userList,
			params: {
				userName: ''
			},
			height: '1000',
			dialogFormVisible: false,
			dialogOrgVisible: false,
			dialogPasswordVisible: false,
			dialogRoleVisible: false,
			title: '修改',
			form: {
				id: 0,
				displayName: '',
				isActive: false,
				isLock: false,
				isStatic: false,
				lastLoginTime: '',
				password: '',
				userName: ''
			},
			changePassForm: {
				oldPassword: '',
				newPass: '',
				newPassword: '',
				id: 0
			},
			loading: false
		};
	},
	components: {
		edit,
		changeOrg,
		changePassword,
		changeRole
	},
	created() {
		console.log(this.$route);
	},
	methods: {
		onEdit(index, row) {
			this.form = row;
			this.dialogFormVisible = true;
		},
		onDelete(index, row) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					deleteUser({
						id: row.id
					})
						.then(data => {
							if (data && data.success) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.$refs.list.onSearch();
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
		onSave() {
			this.loading = true;
			const userData = this.form;
			addOrUpdateUser(userData)
				.then(res => {
					if (res && res.success) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.$refs.list.onSearch();
					} else {
						this.$message.error('操作失败');
					}
				})
				.catch(result => {
					this.$message({
						message: (result && result.error && result.error.message) || '保存失败！',
						type: 'error'
					});
				});
			this.dialogFormVisible = false;
		},
		onDigChange() {
			this.dialogFormVisible = !this.dialogFormVisible;
		},
		onRefresh() {
			this.$refs.list.onSearch(this.params);
		},
		onCreate() {
			this.dialogFormVisible = true;
		},
		onChangePassword(index, row) {
			this.title = '修改密码';
			this.dialogPasswordVisible = true;
			this.changePassForm.id = row.id;
		},
		onChangeRole() {
			this.title = '修改角色';
			this.dialogRoleVisible = true;
		},
		onChangeOrg() {
			this.dialogOrgVisible = true;
		},
		onSavePass() {
			this.loading = true;
			const passData = {};
			passData.oldPassword = this.changePassForm.oldPassword;
			passData.newPassword = this.changePassForm.newPassword;
			passData.id = this.changePassForm.id;
			console.log(passData);
			changePass(passData)
				.then(res => {
					this.validata(res);
					this.resetForm();
					this.dialogPasswordVisible = false;
				})
				.catch(result => {
					this.$message({
						message: (result && result.error && result.error.message) || '保存失败！',
						type: 'error'
					});
				});
		},
		validata(res) {
			if (res && res.success) {
				this.$message({
					message: '操作成功',
					type: 'success'
				});
				this.loading = false;
				this.$refs.list.onSearch();
			} else {
				this.$message.error('操作失败');
			}
		},
		resetForm() {
			console.log(this.$refs);
			this.$refs.changePassword.resetForm();
		}
	}
};
</script>