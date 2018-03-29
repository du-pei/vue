<template>
	<el-menu-item v-if="data.children == null || data.children.length == 0" :index="data.url || ' '" class="custom-submenu" @click="changePath">
		<i :class="data.icon || ''"></i>{{data.displayName}}</el-menu-item>
	<el-submenu v-else :key="data.id" :index="data.id.toString()">
		<template slot="title">
			<i :class="data.icon || ''"></i>{{data.displayName}}</template>
		<submenu :data="item" v-for="(item, index) in data.children" :key="index"></submenu>
	</el-submenu>
</template>

<script>
export default {
	name: 'submenu',
	data() {
		return {};
	},
	props: {
		data: {
			type: [Array, Object],
			default() {
				return [];
			}
		}
	},
	methods: {
		changePath() {
			console.log(this.$route.path);
		}
	}
};
</script>
