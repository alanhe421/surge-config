/**
 * 获取微信拦截网页中目标网页地址，直接返回重定向
 */

(function redirectUrl() {
  try {
    let cgiData = $response.body.match(/(?="url":").+(?=","btns)/)[0];
    cgiData = cgiData.substring(7).replace(new RegExp('&#x2f;', 'g'), '/');
    $done({
      headers: {
        Location: cgiData
      },
      status: 301
    });
  } catch (e) {
    $done({});
  }
})();
