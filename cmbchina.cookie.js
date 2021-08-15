/*
招商银行信用卡微信公众号：“领积分 - 🎁签到领积分” 获取 Cookie
*/

const cookieKey = 'iNotificatioin_cmbchina_cookieKey';
const userAgentKey = 'iNotificatioin_cmbchina_userAgentKey';

// 获取 Cookie
if ($request.headers['Cookie']) {
  var cookie = $request.headers['Cookie'];
  var userAgent = $request.headers['User-Agent'];
  $persistentStore.write(cookie, cookieKey);
  $persistentStore.write(userAgent, userAgentKey);
  $notification.post('成功获取招商银行信用卡 cookie 🎉', '', '请禁用该脚本');
}
$done({});
