import fetch from '@/config/fetch';
import mmbs from './mmbsServer'
import menummbs from './menu'
//登录
export const loginReqest = data => fetch('/User/Login', data, 'post');
//获取用户信息
export const getLoginUserInfo = data => fetch('/api/services/application/userApplication/GetLoginUserInfo', data, 'get');
//系统主页菜单
export const menuData = data => fetch('/api/services/system/loginUser/GetLoginUserTreeGridMenuData', data, 'get');
//系统菜单管理，获取系统菜单
export const systemMenu = data => fetch('/api/services/system/loginUser/GetLoginUserTreeMenuData', data, 'get');
//系统用户列表
export const userList = data => fetch('/api/services/system/user/GetUserDataGridData', data, 'get');
//添加或者修改用户
export const addOrUpdateUser = data => fetch('/api/services/system/user/AddOrModifyUser', data, 'post');
//删除用户
export const deleteUser = data => fetch('/api/services/system/user/DeleteUser', data, 'delete');
//修改密码
export const changePass = data => fetch('/api/services/system/user/ChangePassword', data, 'post');

export const saveData = (collectionName, obj) => mmbs.save(collectionName, obj);
//获取分数列表
export const getData = pageParams => mmbs.queryData(pageParams);

export const editData = (collectionName, obj) => mmbs.editData(collectionName, obj);

export const deleteData = (collectionName, obj) => mmbs.deleteData(collectionName, obj);
//获取树形数据
export const getTreeData = collectionName => mmbs.getTreeDataFromCloud(collectionName);
//获取详细信息
export const getDataById = (collectionName, id) => mmbs.getDataById(collectionName, id);