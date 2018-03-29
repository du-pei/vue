import Mmbs from 'mmbs';
// import { appId, mmbsURL, pageSize } from '../config/env';
// Mmbs.initialize(appId);
// Mmbs.serverURL = mmbsURL;
const groups = Mmbs.Object.extend('groups');

function getChildren(parent, childres) {
    parent.children = [];
    for (let i = 0; i < childres.length; i++) {
        if (childres[i].parent == parent.id) {
            parent.children.push(childres[i]);
            if (childres[i].parent.length != '') {
                getChildren(childres[i], childres);
            } else {
                childres[i].children = [];
            }
        }
    }
}

//获取字典组下拉树
export function getGroupTreeData() {
    const query = new Mmbs.Query(groups);
    return new Promise((resolve, reject) => {
        // 查询所有数据
        query.find({
            success: results => {
                // // 循环处理查询到的数据
                const parents = [];
                const childrens = [];
                for (let i = 0; i < results.length; i++) {
                    const treeData = {};
                    treeData.id = results[i].id;
                    const item = results[i].attributes;
                    for (const key in item) {
                        if (item.hasOwnProperty(key)) {
                            treeData[key] = item[key];
                        }
                    }
                    if (item.parent == '') {
                        parents.push(treeData);
                    } else {
                        childrens.push(treeData);
                    }
                }
                for (let i = 0; i < parents.length; i++) {
                    getChildren(parents[i], childrens);
                }
                resolve({ result: parents, success: true });
            },
            error: error => {
                reject(error);
            }
        });
    });
}