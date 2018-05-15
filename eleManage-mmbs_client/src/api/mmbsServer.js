import Mmbs from 'mmbs';
import {
  appId,
  mmbsURL,
  pageSize
} from '../config/env';
Mmbs.initialize(appId);
Mmbs.serverURL = mmbsURL;

export default {
  save(collectionName, obj) {
    const ClassObj = Mmbs.Object.extend(collectionName);
    const classObj = new ClassObj();
    return new Promise((resolve, reject) => {
      classObj.save(obj, {
        success(model) {
          resolve(resolve({
            result: model,
            success: true
          }));
        },
        error(model, error) {
          if (process.env.NODE_ENV == 'development') {
            console.error(`save ${collectionName} error`, error)
          }
          if ((reject && reject(error)) || Message.error(error)) {
            console.log(error);
          }
        }
      });
    });
  },
  queryData(pageParams = {
    collectionName,
    page: 1,
    rows: pageSize,
    param: {},
    order: '_created_at'
  }) {
    const ClassObj = Mmbs.Object.extend(pageParams.collectionName);
    let query = new Mmbs.Query(ClassObj);
    console.log(pageParams.param);
    if (pageParams.param && pageParams.param.equalTo) {
      for (const index in pageParams.param.equalTo) {
        query = query.equalTo(pageParams.param.equalTo[index].key, pageParams.param.equalTo[index].value);
      }
    }
    const page = pageParams.page || 1,
      limit = pageParams.rows || pageSize,
      skip = (page - 1) * limit;
    return new Promise((resolve, reject) => {
      query.count({
        success(count) {
          query.limit(limit);
          query.skip(skip);
          // 查询成功，返回记录数量
          query.find({
            success(results) {
              resolve({
                result: {
                  total: count,
                  rows: results
                },
                success: true
              });
            },
            error(error) {
              reject(error);
            }
          });
        },
        error(error) {
          reject(error);
        }
      });
    })
  },
  editData(collectionName, obj) {
    const ClassObj = Mmbs.Object.extend(collectionName);
    const query = new Mmbs.Query(ClassObj);
    return new Promise((resolve, reject) => {
      // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
      query.get(obj.id, {
        success(data) {
          // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
          Object.keys(data.attributes).forEach(item => {
            if (obj[item] != undefined) {
              data.set(item, obj[item]);
            }
          });
          data.save();
          resolve({
            result: data,
            success: true
          });
        },
        error(object, error) {
          reject(error);
        }
      });
    });
  },
  deleteData(collectionName, obj) {
    const ClassObj = Mmbs.Object.extend(collectionName);
    const query = new Mmbs.Query(ClassObj);
    return new Promise((resolve, reject) => {
      query.get(obj.id, {
        success(data) {
          data.destroy({
            success(data) {
              // 删除成功
              resolve({
                result: data,
                success: true
              });
            },
            error(data, error) {
              // 删除失败
              reject(error);
            }
          });
        },
        error(object, error) {
          reject(error);
        }
      });
    })
  },
  getTreeData(collectionName) {
    const ClassObj = Mmbs.Object.extend(collectionName);
    const query = new Mmbs.Query(ClassObj);
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
            if (item.parentId == '') {
              parents.push(treeData);
            } else {
              childrens.push(treeData);
            }
          }
          for (let i = 0; i < parents.length; i++) {
            this.getChildren(parents[i], childrens);
          }
          resolve({
            result: parents,
            success: true
          });
        },
        error: error => {
          reject(error);
        }
      });
    });
  },
  getChildren(parent, childres) {
    parent.children = [];
    for (let i = 0; i < childres.length; i++) {
      if (childres[i].parentId == parent.id) {
        parent.children.push(childres[i]);
        if (childres[i].parentId.length != '' || childres[i].parentId > 0) {
          this.getChildren(childres[i], childres);
        } else {
          childres[i].children = [];
        }
      }
    }
  },
  getDataById(collectionName, id) {
    const ClassObj = Mmbs.Object.extend(collectionName);
    let query = new Mmbs.Query(ClassObj);
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
          resolve({
            result: res,
            success: true
          });
        },
        error(object, error) {
          reject(error);
        }
      });
    });
  },
  getTreeDataFromCloud(collectionName) {
    try {
      const data = Mmbs.Cloud.run('getTreeData', {
        collectionName
      });
      return data;
    } catch (error) {
      return error;
    }
  },
  test() {
    Mmbs.Cloud.run('hello').then(data => {
      console.log(data);
      // 调用成功，得到成功的应答 data
    }, error => {
      // 处理调用失败
    });
  },
  login(data) {
    return new Promise((resolve, reject) => {
      Mmbs.User.logIn(data.username, data.password, {
        success: user => {
          resolve({
            result: user,
            success: true
          });
        },
        error: (user, error) => {
          resolve({
            result: error,
            success: false
          });
        }
      });
    })
  },
  /**
   * 登出
   */
  logout() {
    return Mmbs.User.logOut().catch(error => {
      Message.error(error)
    })
  }  
};
export {
  Mmbs,
  pageSize
};
