const title = 'ShadowSocks订阅';
const icon = 'airplane.circle.fill';
const iconColor = '#32CD32';
const iconColorDanger = '#DC3545';

// ss地址
const apiUrl =
  'https://s1.trojanflare.one/{{id}}';
// ua头部
const ua =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

getDataInfo(apiUrl, function (result) {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  hour = hour > 9 ? hour : '0' + hour;
  minutes = minutes > 9 ? minutes : '0' + minutes;
  if (result.error) {
    $done({
      title: `${title} | ${hour}:${minutes}`,
      content: '获取失败，请检查模块或网络',
      icon: icon,
      'icon-color': iconColorDanger
    });
  }
  const htmlCnt = result.data;
  const remaining = htmlCnt.match(/(?<=Remaining Traffic)(.+)(?=")/)?.[0]?.trim();
  const deadline = htmlCnt.match(/(?<=Valid until )(.+)(?=\sRemaining)/)?.[0]?.trim();

  $done({
    title: `${title}`,
    content: `本月剩余流量(${remaining}）\n订阅到期时间${deadline}`,
    icon: `${icon}`,
    'icon-color': `${iconColor}`
  });
});

function getDataInfo(url, callback) {
  const headers = {
    'User-Agent': ua,
  };

  $httpClient.get(
    { url: url, headers: headers },
    function (error, response, data) {
      if (error || response.status !== 200) {
        callback({ error: true, data: null });
      } else {
        callback({ error: false, data: data });
      }
    }
  );
}
