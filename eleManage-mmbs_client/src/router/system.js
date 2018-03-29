import Vue from 'vue';
import Router from 'vue-router';

import AssetList from '../apps/app/system/Asset/AssetList.vue';
import MenuList from '../apps/app/system/menu/menuList.vue';
import AssetTypeList from '../apps/app/system/Asset/AssetTypeList.vue';
import ManufacturerList from '../apps/app/system/Asset/ManufacturerList.vue';
import ModelList from '../apps/app/system/Asset/ModelList.vue';
import SettingList from '../apps/app/system/Config/SettingList.vue';
import DepartmentList from '../apps/app/system/Department/DepartmentList.vue';
import DictionaryList from '../apps/app/system/dictionary/dictionaryList.vue';
import Grouplist from '../apps/app/system/dictionary/grouplist.vue';
import Filecategory from '../apps/app/system/file/filecategory.vue';
import Filelist from '../apps/app/system/file/filelist.vue';
import Folderlist from '../apps/app/system/file/folderlist.vue';
import Auditlog from '../apps/app/system/log/auditlog.vue';
import UserList from '../apps/app/system/user/userlist.vue';
import AdministrativeRegions from '../apps/app/system/administrative/regions.vue';
Vue.use(Router);

export const routes = [{
        name: 'AssetList',
        path: '/system/Asset/AssetList',
        component: AssetList,
        meta: ['系统设备']
    },
    {
        name: 'MenuList',
        path: '/system/menu/MenuList',
        component: MenuList,
        meta: ['系统菜单']
    },
    {
        name: 'AdministrativeRegions',
        path: '/system/administrative/regions',
        component: AdministrativeRegions,
        meta: ['行政区域划分']
    },
    {
        name: 'AssetTypeList',
        path: '/system/Asset/AssetTypeList',
        component: AssetTypeList,
        meta: ['设备类型']
    },
    {
        name: 'ManufacturerList',
        path: '/system/Asset/ManufacturerList',
        component: ManufacturerList,
        meta: ['设备厂家']
    },
    {
        name: 'ModelList',
        path: '/system/Asset/ModelList',
        component: ModelList,
        meta: ['设备型号']
    },
    {
        name: 'SettingList',
        path: '/system/Config/SettingList',
        component: SettingList,
        meta: ['系统配置项']
    },
    {
        name: 'DepartmentList',
        path: '/system/Department/DepartmentList',
        component: DepartmentList,
        meta: ['部门']
    },
    {
        name: 'DictionaryList',
        path: '/system/dictionary/dictionaryList',
        component: DictionaryList,
        meta: ['字典项']
    },
    {
        name: 'Grouplist',
        path: '/system/dictionary/grouplist',
        component: Grouplist,
        meta: ['字典组']
    },
    {
        name: 'Filecategory',
        path: '/system/file/filecategory',
        component: Filecategory,
        meta: ['文件类别']
    },
    {
        name: 'Filelist',
        path: '/system/file/filelist',
        component: Filelist,
        meta: ['文件']
    },
    {
        name: 'Folderlist',
        path: '/system/file/folderlist',
        component: Folderlist,
        meta: ['文件夹']
    },
    {
        name: 'Auditlog',
        path: '/system/log/auditlog',
        component: Auditlog,
        meta: ['操作日志']
    },
    {
        name: 'UserList',
        path: '/system/user/userlist',
        component: UserList,
        meta: ['系统用户', '用户']
    }
];