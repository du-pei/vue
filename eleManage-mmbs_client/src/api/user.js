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