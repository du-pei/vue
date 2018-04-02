<template>
	<el-form :model="form" :collectionName='collectionName' ref="form" label-width="80px">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="显示名称">
					<el-input v-model="form.displayName"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="地址">
					<el-input v-model="form.url"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="图标">
					<el-input v-model="form.icon"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="排序">
					<el-input v-model="form.sort"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="是否启用">
					<el-select v-model="form.isActive" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item label="父级">
			<combotree ref="combotree" placeholder="请选择" v-model="form.parentId" :treeData="treeData" :multiple="false" panel-height="150px" :dataProps=dataProps :comboProps=comboProps>
			</combotree>
		</el-form-item>
		<el-form-item label="操作">
			<el-checkbox-group v-model="checked" @change="checkBox">
				<ul>
					<template v-for="item in form.operates">
						<li :key="item.text">
							<el-checkbox :label="item.name" :checked="item.isCheck" v-model="item.isCheck" :key="item.name" >{{item.text}}</el-checkbox>	
							<i class="el-icon-remove"></i>						
						</li>
					</template>
				</ul>
				
				<el-button type="primary" icon="el-icon-plus" placeholder="添加操作" @click="addOpt" size="mini" circle></el-button>
			</el-checkbox-group>
		</el-form-item>
		<el-dialog :title="title" :visible.sync="dialogFormOpt" :close-on-click-modal='false' :before-close='callOf' append-to-body width="30%">
			<el-form>
				<el-form-item label="名称">
					<el-input v-model="optForm.text"></el-input>
				</el-form-item>
				<el-form-item label="值">
					<el-input v-model="optForm.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="callOf">取 消</el-button>
				<el-button type="primary" @click="saveOpt">确 定</el-button>
			</div>
		</el-dialog>
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
			],
			dialogFormOpt: false,
			checked: [],
			optForm: {
				text: '',
				name: '',
				isCheck: true
			},
			title: '添加操作'
		};
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
			this.$refs.form.resetFields();
		},
		getTreeData() {
			getMenuTreeData().then(res => {
				const def = {};
				def.displayName = '无';
				def.id = '';
				res.unshift(def);
				this.treeData = res;
			});
		},
		getValue() {
			alert(this.selectVal.join());
		},
		checkBox(item) {
			console.log(item);
			console.log(this.form);
		},
		addOpt() {
			this.dialogFormOpt = true;
		},
		callOf() {
			this.optForm.key = '';
			this.optForm.value = '';
			this.dialogFormOpt = false;
		},
		saveOpt() {
			this.form.operates.push(this.optForm);
			this.callOf();
		}
	}
};
</script>