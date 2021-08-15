const checkinURL =
  'https://weclub.xyk.cmbchina.com/SCRMCustomActivityFront/checkin-plus/request/checkin.json';
const cookieKey = 'iNotificatioin_cmbchina_cookieKey';
const userAgentKey = 'iNotificatioin_cmbchina_userAgentKey';

var request = {
  url: checkinURL,
  headers: {
    Cookie: $persistentStore.read(cookieKey),
    'User-Agent': $persistentStore.read(userAgentKey),
    'Content-type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify({ activityCode: 'checkinPlus' })
};

$httpClient.post(request, (error, response, data) => {
  if (error) {
    $notification.post('招商银行信用卡', '', reason.error);
  } else {
    const result = JSON.parse(data);
    if (result.respCode == 1000) {
      $notification.post(
        '招商银行信用卡',
        '',
        '签到成功，获得 ' + result.data.awardValue + ' 积分🎁'
      );
    } else if (result.respCode == 1452) {
      $notification.post('招商银行信用卡', '', '签到失败，请获取 cookie');
    } else if (result.respCode == 'custom_8500') {
      $notification.post('招商银行信用卡', '', '签到失败，' + result.respMsg);
    } else {
      $notification.post('招商银行信用卡', '', '签到失败，请查看日志');
    }
  }
  $done();
});
