// 获取用户列表
Mmbs.Cloud.define('getUsers', (request, response) => {
    let query = new Mmbs.Query(Mmbs.User);
    const params = request.params;
    console.log(params);
    let page = params.page || 1,
        limit = params.rows;
    const skip = (page - 1) * limit;
    query.count({
        success(count) {
            query.limit(limit);
            query.skip(skip);
            // 查询成功，返回记录数量
            query.find({
                success(results) {
                    response.success({
                        result: {
                            total: count,
                            rows: results
                        },
                        success: true
                    });
                },
                error(error) {
                    response.error(error);
                }
            });
        },
        error(error) {
            response.error(error);
        }
    });
});
// 保存用户信息
Mmbs.Cloud.define('saveUser', (request, response) => {
    try {
        const data = request.params;
        if (data == null) {
            response.error("用户信息为空");
        }
        let user = new Mmbs.User();
        user.save(data, { useMasterKey: true });
        response.success({ result: user, success: true });
    } catch (error) {
        response.error({ result: error, success: false });
    }
});
// 删除用户
Mmbs.Cloud.define('deleteUser', (request, response) => {

});
//注册 新增用户
Mmbs.Cloud.define('registerUser', (request, response) => {
    var user = new Mmbs.User();
    let data = request.params
    user.signUp(data, {
        success: function(user) {
            response.success({ result: user, success: true });
        },
        error: function(user, error) {
            response.error({ result: error, success: false });
        }
    });
});