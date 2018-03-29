/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
const baseUrl = ''; //process.env.API_ROOT
const routerMode = 'history';
const baseImgPath = 'http://images.cangdu.org/';

// appId: 应用名
const appId = 'YTAPP';
// mmbsURL: mmbs服务地址
const mmbsURL = 'http://localhost:3080/mmbs';
const pageSize = 20;
// 默认语言
const locale = 'cn';
if (process.env.NODE_ENV === 'development') {
    //baseUrl = 'http://cangdu.org:8001';
} else {
    //baseUrl = 'http://xxx.apiservice.com:8001';
}

export {
    baseUrl,
    routerMode,
    baseImgPath,
    appId,
    mmbsURL,
    locale,
    pageSize
}