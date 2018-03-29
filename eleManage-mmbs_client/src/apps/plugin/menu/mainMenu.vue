<template>
    <el-menu router class="el-menu-vertical" background-color="#464C5B" text-color="#fff" :unique-opened="uniqueOpened" :collapse="isCollapse">
        <submenu v-for="(item,index) in data" :key="item.id" :index="item.id.toString()" :data="item"></submenu>
    </el-menu>
</template>
<script>
import submenu from './itemMenu.vue';
export default {
	components: {
		submenu
	},
	props: {
		data: {
			type: Array,
			default() {
				return [];
			}
		},
		isCollapse: Boolean,
		uniqueOpened: Boolean
	}
};
</script>