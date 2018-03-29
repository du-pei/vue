// 注册全局组件
import mainMenu from './menu/mainMenu';
import itemMenu from './menu/itemMenu';
import grid from './grid/grid';
import treeGrid from './grid/treeGrid';
import { formatDate, formatBool } from '../../config/formatter';
import combotree from './tree/combotree';
import ytMap from './map/map.vue';
const plugins = {
    mainMenu,
    itemMenu,
    grid,
    treeGrid,
    combotree,
    ytMap
};
export default {
    install(Vue) {
        for (const key in plugins) {
            if (plugins.hasOwnProperty(key)) {
                Vue.component(key, plugins[key]);
            }
        }
        // 格式化时间
        Vue.prototype.$fmtData = (data, format) => {
            if (data) {
                return formatDate(data, format || 'YYYY-MM-DD HH:mm:ss');
            }
        };

        Vue.prototype.$fmtBool = value => {
            return formatBool(value);
        };
    }
};