<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		<h3 class="title">系统登录</h3>
		<el-form-item prop="account">
			<el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
		</el-form-item>
		<el-form-item prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
		</el-form-item>
		<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		<el-form-item style="width:100%;">
			<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
			<!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
		</el-form-item>
	</el-form>
</template>

<script>
import { login } from '@/api/index.js';
import $ from 'jquery';
import md5 from '../../../static/js/md5.min.js'
export default {
	data() {
		return {
			logining: false,
			ruleForm: {
				account: 'admin',
				checkPass: 'yt123456'
			},
			rules: {
				account: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
					//{ validator: validaePass }
				],
				checkPass: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
					//{ validator: validaePass2 }
				]
			},
			checked: true,
			user: {
				userName: '',
				objectId: '',
				sessionToken: ''
			}
		};
	},
	created() {
		this.getUserInfo();
	},
	methods: {
		handleReset() {
			this.$refs.ruleForm.resetFields();
		},
		handleSubmit() {
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					this.logining = true;
					const loginParams = {
						username: this.ruleForm.account,
						password: this.ruleForm.checkPass
					};
					login(loginParams).then(data => {
						if (data && data.success) {
							const userInfo = data.result;
							this.logining = false;
							this.loginAnyReport();
							this.$message({
								type: 'success',
								message: '登录成功!'
							});							
							// this.user.userName = userInfo.attributes.username;
							// this.user.objectId = userInfo.id;
							// this.user.sessionToken = userInfo.attributes.sessionToken;
							localStorage.user = JSON.stringify(userInfo);
							this.$router.push('manage');
						} else {
							if (data.result.code == 101) {
								this.$message({
									type: 'error',
									message: '用户名或密码错误!'
								});
							} else {
								this.$message({
									type: 'error',
									message: '登录失败!'
								});
							}
						}
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		getUserInfo() {
			if (localStorage.user !== 'undefined') {
				this.$router.push('manage');
			}
		},
		loginAnyReport() {
			$.ajax({
				url: 'http://localhost:9905/dmp/index/sso.htm',
				data: { userName: 'demo', password: md5('123456') },
				dataType: 'jsonp',
				jsonp: 'callback',
				success(code) {					
					if (code == 0) {
						localStorage.report = code;
						//alert('success');
						//success
					} else {
						//error
					}
				},
				error(err) {
					console.log(err);
					//error
				}
			});
		}
	}
};
</script>

<style>
body {
	background-color: #1f2d3d;
}
.login-container {
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin: 180px auto;
	width: 350px;
	padding: 35px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
}

.title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}

.remember {
	margin: 0px 0px 35px 0px;
}
</style>