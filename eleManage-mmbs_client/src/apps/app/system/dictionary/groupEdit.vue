<template>
    <el-form :model="form" ref="form">
        <el-form-item label="项目名">
            <el-input v-model="form.displayName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
            <el-input v-model="form.index" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级">
            <combotree v-if="treeData.length>0" ref="combotree" v-model="form.parent" :treeData="treeData" :multiple="false" panel-height="150px" :dataProps=dataProps :comboProps=comboProps>
            </combotree>
        </el-form-item>

    </el-form>
</template>

<script>
import { getGroupTreeData } from '@/api/groupServer';
export default {
	data() {
		return {
			selectVal: '',
			treeData: [],
			dataProps: { children: 'children', label: 'displayName' },
			comboProps: { value: 'id', label: 'displayName' }
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
	created() {
		this.selectVal = this.form.parent;		
	},
	mounted() {
        this.getTreeData();
	},
	methods: {
		resetForm() {
			console.log(this.$refs.form);
			this.$refs.form.resetFields()
		},
		getTreeData() {
			getGroupTreeData().then(res => {
				this.treeData = res.result;
			});
		},
		getValue() {
            alert(this.selectVal.join())
        }
	}
};
</script>