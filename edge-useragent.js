(async () => {
  const headers = $request.headers;

  delete headers['user-agent'];
  delete headers['sec-ch-ua-full-version'];
  delete headers['sec-ch-ua-full-version-list'];

  if ($environment.system === 'macOS') {
    headers['User-Agent'] =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50';
    headers['sec-ch-ua'] =
      '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"';
    headers['sec-ch-ua-mobile'] = '?0';
    headers['sec-ch-ua-platform'] = 'macOS';
  } else {
    headers['User-Agent'] =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Mobile/15E148 Safari/605.1.15 BingSapphire/1.0.410205001';
  }
  $done({ headers });
})();
