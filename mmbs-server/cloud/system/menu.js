const Collection = require('../collectionNames');


Mmbs.Cloud.define('saveData', function(request, response) {
    const ClassObj = Mmbs.Object.extend(Collection.SYS_MENU);
    const classObj = new ClassObj();
    classObj.save(obj, {
        success(model) {
            response.success(model);
        },
        error(model, error) {
            response.error(model);
        }
    });
});

Mmbs.Cloud.define('hello', (request, response) => {
    response.success('hello Mmbs');
});
//获取菜单树形数据
Mmbs.Cloud.define('getMenuTreeData', (request, response) => {
    const ClassObj = Mmbs.Object.extend(Collection.SYS_MENU);
    const query = new Mmbs.Query(ClassObj); // 查询所有数据
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
                if (item.parentId == '') {
                    parents.push(treeData);
                } else {
                    childrens.push(treeData);
                }
            }
            for (let i = 0; i < parents.length; i++) {
                getChildren(parents[i], childrens);
            }
            response.success(parents);
        },
        error: error => {
            response.error(error);
        }
    });
});

function getChildren(parent, childres) {
    parent.children = [];
    for (let i = 0; i < childres.length; i++) {
        if (childres[i].parentId == parent.id) {
            parent.children.push(childres[i]);
            if (childres[i].parentId.length != '' || childres[i].parentId > 0) {
                getChildren(childres[i], childres);
            } else {
                childres[i].children = [];
            }
        }
    }
}
/**
 * 删除菜单
 * @param request.params.id {String} - 用户id
 * @param roleName {String} - 角色名称
 */
Mmbs.Cloud.define('deleteMenu', (request, response) => {
    const ClassObj = Mmbs.Object.extend(Collection.SYS_MENU);
    const query = new Mmbs.Query(ClassObj);
    query.get(request.params.id, {
        success(data) {
            data.destroy({
                success(data) {
                    // 删除成功
                    response.success({ result: data, success: true });
                },
                error(data, error) {
                    // 删除失败
                    response.error({ result: error, success: false });
                }
            });
        },
        error(object, error) {
            response.error({ result: error, success: false });
        }
    });
});