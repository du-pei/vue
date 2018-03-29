<template>
	<el-container>
		<el-aside class="left_aside" :width="width">
			<keep-alive>
				<div>
					<mainMenu :data="menu" @click="handleOpen" :uniqueOpened="uniqueOpened" :isCollapse="isCollapse"></mainMenu>
				</div>
			</keep-alive>
		</el-aside>
		<el-container>
			<el-header style="text-align: right;">
				<div class="layout-toggle">
					<el-button type="primary" icon="el-icon-menu" @click="toggleClick"></el-button>
				</div>
				<el-dropdown @command='handleCommand'>
					<i class="el-icon-setting" style="margin-right: 25px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="detail">详细信息</el-dropdown-item>
						<el-dropdown-item command="rePass">修改密码</el-dropdown-item>
						<el-dropdown-item command="logOut">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>{{ userName }}</span>
			</el-header>
			<el-main>
				<div class="main_breadcrumb">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
						<!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item>
						<el-breadcrumb-item>活动列表</el-breadcrumb-item>
						<el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
					</el-breadcrumb>
				</div>
				<div class="mainPage" v-if="this.$route.path != '/manage'">
					<router-view></router-view>
				</div>
				<div v-else class="mainPage_full">
					<router-view></router-view>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
import { getUserMenus } from '@/api/index';
export default {
	data() {
		return {
			defaultActive: '1',
			isCollapse: false,
			uniqueOpened: true,
			menu: [],
			userName: '',
			SYS_MENU: 'meuns',
			width: '200px'
		};
	},
	created() {
		this.getMenuData();
		this.showUserInfo();
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		handleSelect() {
			console.log();
		},
		async getMenuData() {
			await getUserMenus(this.SYS_MENU).then(
				res => {
					if (res && res.result) {
						this.menu = res.result;
					}
				},
				err => {
					console.log(err);
				}
			);
		},
		handleCommand(command) {
			switch (command) {
				case 'logOut':
					localStorage.user = undefined;
					this.$router.push('/login');
					break;
			}
		},
		showUserInfo() {
			const info = JSON.parse(localStorage.user);
			if (info) {
				this.userName = info.username;
			}
		},
		toggleClick() {
			if (this.width == '200px') {
				this.width = '0';
			} else {
				this.width = '200px';
			}
		}
	}
};
</script>
<style>
@import '../../style/apps/main.css';
</style>