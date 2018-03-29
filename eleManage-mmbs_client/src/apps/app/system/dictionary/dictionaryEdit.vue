<template>
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称">
            <el-input v-model="form.text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值">
            <el-input v-model="form.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
            <el-select v-model="form.isUse" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
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
			},
			options: [
				{
					value: true,
					label: '是'
				},
				{
					value: false,
					label: '否'
				}
			]
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