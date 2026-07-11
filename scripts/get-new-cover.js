const u = 'https://open.spotify.com/track/0cVrLxeQjiAcftuGzp32qY';
fetch(u)
  .then(r => r.text())
  .then(html => {
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    console.log(match ? match[1] : 'NOT FOUND');
  });
