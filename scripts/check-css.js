async function check() {
  const html = await (await fetch('http://127.0.0.1:3000/')).text();
  const idx = html.indexOf('/_next/static/css/');
  if (idx === -1) {
    console.log('No /_next/static/css/ in HTML!');
    return;
  }
  const endIdx = html.indexOf('"', idx);
  const href = html.substring(idx, endIdx);
  console.log('Exact CSS href:', href);
  const res = await fetch('http://127.0.0.1:3000' + href);
  console.log('Status:', res.status, res.headers.get('content-type'));
  const text = await res.text();
  console.log('Length:', text.length);
  console.log('Snippet:\n', text.substring(0, 300));
}

check().catch(console.error);
