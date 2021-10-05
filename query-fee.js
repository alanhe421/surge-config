/**
 * 查询话费/联通
 * 中国联通App-首页-剩余话费，提示写入cookie成功即可
 * 配置如下
 * query-fee-cookie = type=http-request,pattern=^https://m\.client\.10010\.com/servicequerybusiness/balancenew/accountBalancenew\.htm,script-path=query-fee.js
 * query-fee-task = type=cron,cronexp=0 0 1 7 * ?,script-path=query-fee.js    
 */

let isGetCookie = typeof $request !== 'undefined';
const cookieKey = 'fee_cookie_10010';
const userAgentKey = 'fee_cookie_ua';
if (isGetCookie) {
  setCookie();
} else {
  queryFee();
}

function setCookie() {
  const cookie = $persistentStore.write($request.headers['Cookie'], cookieKey);
  $persistentStore.write($request.headers['User-Agent'], userAgentKey);
  if (cookie) {
    $notification.post('联通', '', 'Cookie写入成功');
  }
}

function queryFee() {
  let url = {
    url: 'https://m.client.10010.com/servicequerybusiness/balancenew/accountBalancenew.htm',
    headers: {
      Referer: 'https://img.client.10010.com/',
      'User-Agent': $persistentStore.read(userAgentKey),
      Cookie: $persistentStore.read(cookieKey),
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://img.client.10010.com',
      'Accept-Encoding': 'gzip, deflate, br'
    },
    body: {}
  };
  $httpClient.post(url, (error, response, data) => {
    if (error) {
      $notification.post('联通话费查询失败剩余', '', '详细原因查看日志');
      console.log(error);
    } else {
      console.log(data);
      $notification.post(
        '联通剩余话费',
        '',
        JSON.parse(data).curntbalancecust + 'CNY'
      );
    }
    $done();
  });
}
