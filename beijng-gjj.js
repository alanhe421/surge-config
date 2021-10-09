/**
 * 下载北京通App，访问公积金页面，提示写入Cookie成功即可
 * query-beijing-gjj-cookie = type=http-request,pattern=^https:\/\/service\.beijingtoon\.com/bjt-housing-fund\/fund\/getPersonalLedger,script-path=beijng-gjj.js
 * query-beijing-gjj-task = type=cron,cronexp=0 0 1 7 * ?,script-path=beijng-gjj.js
 * [MITM]
 * hostname = %APPEND% service.beijingtoon.com:443
 */
let isGetCookie = typeof $request !== 'undefined';
const cookieKey = 'gjj_cookie';
const userAgentKey = 'gjj_cookie_ua';
const notification_title = '北京通';
const notification_subtitle = '公积金查询';

if (isGetCookie) {
  setCookie();
} else {
  queryFee();
}

function setCookie() {
  const cookie = $persistentStore.write(
    $request.headers['sessionId'],
    cookieKey
  );
  $persistentStore.write($request.headers['User-Agent'], userAgentKey);
  if (cookie) {
    $notification.post(
      notification_title,
      notification_subtitle,
      'Cookie写入成功'
    );
  }
}

function queryFee() {
  $httpClient.post(
    {
      url: 'https://service.beijingtoon.com/bjt-housing-fund/fund/getPersonalLedger',
      headers: {
        sessionId: $persistentStore.read(cookieKey),
        Accept: 'application/json, text/plain, */*',
        Referer: 'https://static.beijingtoon.com/',
        'User-Agent': $persistentStore.read(userAgentKey)
      }
    },
    (error, response, data) => {
      if (error) {
        console.log(error);
        $notification.post(
          notification_title,
          notification_subtitle,
          '查询失败，具体查看日志'
        );
      } else {
        const item = JSON.parse(data).data[0].find(
          (item) => item.name === 'YE'
        );
        $notification.post(
          notification_title,
          notification_subtitle,
          item.title + ':' + (+item.info).toLocaleString('en-US')
        );
      }
      $done();
    }
  );
}
