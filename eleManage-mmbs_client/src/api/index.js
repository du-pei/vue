import fetch from '@/config/fetch';
import mmbs from './mmbsServer';

//登录
export const login = data => mmbs.login(data);
/**
 * 登出
 */
export const logout = () => mmbs.logout();

export const getUserMenus = collectionName => mmbs.getTreeData(collectionName);
//保存数据
export const saveData = (collectionName, obj) => mmbs.save(collectionName, obj);
//获取分数列表
export const getData = pageParams => mmbs.queryData(pageParams);
//编辑数据
export const editData = (collectionName, obj) => mmbs.editData(collectionName, obj);
//删除
export const deleteData = (collectionName, obj) => mmbs.deleteData(collectionName, obj);
//获取字典组树形数据
export const getTreeData = collectionName => mmbs.getTreeData(collectionName);
//获取详细信息
export const getDataById = (collectionName, id) => mmbs.getDataById(collectionName, id);