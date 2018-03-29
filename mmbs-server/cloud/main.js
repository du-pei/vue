Mmbs.Cloud.define('getMessagesForUser', function(request, response) {
    var user = Mmbs.User.current();

    var query = new Mmbs.Query('Messages');
    query.equalTo('recipient', user);
    query.find()
        .then(function(messages) {
            response.success(messages);
        });
});

Mmbs.Cloud.define('getTreeData', (request, response) => {
    const ClassObj = Mmbs.Object.extend(request.params.collectionName);
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
            console.log(parents);
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

require('./system/menu');