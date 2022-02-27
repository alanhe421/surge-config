/**
 *
 */

(function redirectUrl() {
  try {
    let cgiData = $response.body.match(
      /"url":"(.+)","btns":\[{"name":"继续访/
    )[0];
    cgiData = cgiData.substring(7);
    cgiData = cgiData.substring(0, cgiData.length - 22);
    cgiData = cgiData.replace(new RegExp('&#x2f;', 'g'), '/');
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
