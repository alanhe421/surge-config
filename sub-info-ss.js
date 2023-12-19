let title = 'SS订阅详情';
let icon = 'airplane.circle';
let iconColor = '#32CD32';
// ss地址
const apiUrl =
  'https://portal.shadowsocks.nz/clientarea.php?action=productdetails&id=xxxx';
// cookie  
const cookie =
  '';
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
      'icon-color': '#ff4500'
    });
  }
  const htmlCnt = result.data;
  const infoArr=htmlCnt.match(/(?<=<span class="list-info-text">).+(?=<\/)/g);
  const used = htmlCnt.match(/(?<=<span class="number">)(\d|\.)+/)[0];
  const allowance = htmlCnt.match(/(?<=<span class="allowance">).+(?=<\/)/)[0];
  const deadline = infoArr[5];

  $done({
    title: `${title}`,
    content: `已用流量${used} GB，每月流量上限${allowance}\n到期时间${deadline}`,
    icon: `${icon}`,
    'icon-color': `${iconColor}`
  });
});

function getDataInfo(url, callback) {
  const headers = {
    'User-Agent': ua,
    Cookie: cookie
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
