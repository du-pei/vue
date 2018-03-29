// import { mmbs, pageSize } from './mmbsServer';
import Mmbs from 'mmbs';
const SYS_MENU = 'meuns';
const sysMenu = Mmbs.Object.extend(SYS_MENU);

export function saveMenu(obj) {
    const menu = new sysMenu();
    return new Promise((resolve, reject) => {
        menu.save(obj, {
            success(model) {
                resolve({ result: model, success: true });
            },
            error(model, error) {
                reject({ result: error, success: false })
            }
        });
    })
}

export function getMenuTreeData() {
    const data = Mmbs.Cloud.run('getMenuTreeData');
    return data;
}

export function deleteMenu(id) {
    const data = Mmbs.Cloud.run('deleteMenu', { id });
    console.log(data);
    return data;
}

export function getMenuById(id) {
    let query = new Mmbs.Query(sysMenu);
    return new Promise((resolve, reject) => {
        query.get(id, {
            success(data) {
                const item = data.attributes;
                let res = {};
                res.id = data.id;
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        res[key] = item[key];
                    }
                }
                resolve({ result: res, success: true });
            },
            error(object, error) {
                resolve({ result: error, success: false });
            }
        });
    });
}