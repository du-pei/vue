<template>
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="项目名">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="form.text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分数" prop="score">
            <el-input v-model="form.score" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
	data() {
		const validateScore = (rule, value, callback) => {
			if (parseInt(value) <= 0) {
				callback(new Error('请输入数字'));
				return;
			} else {
				callback();
			}
		};
		return {
			rules: {
				score: [{ validator: validateScore, trigger: 'keyup' }]
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