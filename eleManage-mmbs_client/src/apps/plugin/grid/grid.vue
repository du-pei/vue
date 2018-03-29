<template>
	<div class="layout-content">
		<div class="button-block">
			<slot name="buttons"></slot>
		</div>
		<el-table v-loading.fullscreen.lock="fullscreenLoading" :stripe="stripe" :height="height" :border="border" highlight-current-row :data="tableData" @current-change="handleCurrentChange" @selection-change="selectionChange" :empty-text="emptyText" :fit="fit">
			<!-- <el-table-column v-if="checkBox" type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" :index="indexMethod">
			</el-table-column>
			<el-table-column v-for="column in columns" :fixed="column.fixed" :align="column.align" :prop="column.value" :label="column.label" :key="column.value" :width="column.width" :sortable="column.sortable" :formatter="column.formatter" :class-name="column.className">
			</el-table-column> -->
			<slot name="columns"></slot>
		</el-table>
		<div v-if="pagination" class="Pagination">
			<el-pagination background @size-change="handleSizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'dataGrid',
	data() {
		return {
			tableData: [],
			emptyText: '暂无数据',
			total: 0,
			pageSize: 10,
			currentPage: 1,
			fullscreenLoading: false
		};
	},
	props: {
		/*是否显示斑马纹*/
		stripe: {
			type: Boolean,
			default() {
				return true;
			},
			required: false
		},
		border: {
			type: Boolean,
			default() {
				return true;
			},
			required: false
		},
		height: {
			type: String,
			default() {
				return '800';
			},
			required: false
		},
		maxHeight: {
			type: String,
			default: '',
			required: false
		},
		/*列宽是否自撑开*/
		fit: {
			type: Boolean,
			default: true,
			required: false
		},
		/*查询Api,方法*/
		searchApi: {
			type: Function,
			required: true
		},
		/*查询参数*/
		params: {
			type: Object,
			default() {
				return {};
			},
			required: false
		},
		pagination: {
			type: Boolean,
			default: true,
			required: false
		},
		checkBox: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	created() {
		this.initData();
	},
	methods: {
		handleCurrentChange(currentRow) {
			this.currentRow = currentRow;
		},
		selectionChange(selection) {
			this.currentRow = selection;
		},
		handleSizeChange(size) {
			this.pageSize = size;
			this.initData();
		},
		//当前页变动处理事件
		currentChange(currentPage) {
			this.currentPage = currentPage;
			this.initData();
		},
		async initData() {
			try {
				await this.getApiData();
			} catch (error) {
				this.$message.error('获取数据失败');
			}
		},
		async getApiData(paramsData) {
			this.fullscreenLoading = true;
			const params = paramsData || this.params;
			console.log(params);
			params.page = this.currentPage;
			params.rows = this.pageSize;
			const data = await this.searchApi(params);
			console.log(data);
			if (data && data.success) {
				this.tableData = data.result.rows;
				this.total = data.result.total;
			}
			this.fullscreenLoading = false;
		},
		onSearch(paramsData) {
			this.getApiData(paramsData);
		},
		indexMethod(index) {
			return index + 1;
		}
	}
};
</script>

<style>
.el-table thead {
	background: #545c64;
}
.layout-content {
	min-height: 200px;
	margin: 15px;
	overflow: hidden;
	background: #fff;
	border-radius: 4px;
}
.layout-content-main {
	padding: 10px;
}
.button-block {
	padding-bottom: 5px;
}
.el-table_tb tr {
	height: 52px !important;
}
</style>
