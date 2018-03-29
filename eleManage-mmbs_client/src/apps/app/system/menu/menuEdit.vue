<template>
    <el-form :model="form" :collectionName='collectionName' ref="form">
        <el-form-item label="显示名称">
            <el-input v-model="form.displayName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标">
            <el-input v-model="form.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
            <el-input v-model="form.sort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
            <el-select v-model="form.isActive" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item> 
        <el-form-item label="父级">
            <combotree ref="combotree" placeholder="请选择" v-model="form.parentId" :treeData="treeData" :multiple="false" panel-height="150px" :dataProps=dataProps :comboProps=comboProps>
            </combotree>
        </el-form-item>
    </el-form>
</template>

<script>
import { getMenuTreeData } from '@/api/menu';
export default {
	data() {
		return {
			selectVal: '',
            treeData: [],
			dataProps: { children: 'children', label: 'displayName' },
            comboProps: { value: 'id', label: 'displayName' },
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
        }
	},
	props: {
		form: {
			type: Object,
			default() {
				return {};
			},
			required: true
        },
        collectionName: ''
	},
	created() {
		this.selectVal = this.form.parent;		
	},
	mounted() {
        this.getTreeData();
	},
	methods: {
		resetForm() {
			this.$refs.form.resetFields()
		},
		getTreeData() {
			getMenuTreeData().then(res => {
				const def = {};
				def.displayName = '无';
				def.id = '';
				res.unshift(def);
				console.log(res);
				this.treeData = res;
			});
		},
		getValue() {
            alert(this.selectVal.join())
        }
	}
};
</script>