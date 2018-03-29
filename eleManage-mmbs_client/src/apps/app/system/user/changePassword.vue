<template>
	<el-form :model="form" status-icon :rules="rules" ref="form">
		<el-form-item label="旧密码" prop="oldPassword">
			<el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="新密码" prop="newPass">
			<el-input type="password" v-model="form.newPass" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="newPassword">
			<el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	data() {
		const validateOldPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		};
		const validateNewPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.form.newPassword !== '') {
					this.$refs.form.validateField('newPassword');
				}
				callback();
			}
		};
		const validateConPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form.newPass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			rules: {
				oldPassword: [{ validator: validateOldPass, trigger: 'blur' }],
				newPass: [{ validator: validateNewPass, trigger: 'blur' }],
				newPassword: [{ validator: validateConPass, trigger: 'blur' }]
			}
		};
	},
	props: {
		form: {
			type: Object,
			default() {
				return {};
			},
			required: true
		}
	},
	methods: {
		resetForm() {
			this.$refs.form.resetFields();
		}
	}
};
</script>