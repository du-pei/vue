import Mmbs from 'mmbs';

/**
 * 获取所有用户
 */
export function getUsers(params = {}) {
  let query = Mmbs.Cloud.run('getUsers', params);
  return query;
}

/**
 * 保存用户
 * @param obj {Object} - 保存的对象
 */
export function saveUser(obj) {
  let ret = Mmbs.Cloud.run('saveUser', obj);
  return ret;
}

export function deleteUser(obj) {
  let ret = Mmbs.Cloud.run('deleteUser', obj);
  return ret;
}

export function registerUser(obj) {
  let ret = Mmbs.Cloud.run('registerUser', obj);
  return ret;
}

export function getObjectDataByName(key, value) {
  console.log(key + '==' + value);
  if (key.length > 0 && value.length > 0) {
    let query = new Mmbs.Query(Mmbs.User);
    return new Promise((resolve, reject) => {
      query.equalTo(key, value);
      query.find({
        success(data) {
          console.log(data);
          let res = [];
          if (data.length > 0) {
            data.map(item => {
              const attr = item.attributes;
              let user = {};
              user.id = item.id;
              for (const key in attr) {
                if (attr.hasOwnProperty(key)) {
                  user[key] = attr[key];
                }
              }
              res.push(user);
            })
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
  }
}
