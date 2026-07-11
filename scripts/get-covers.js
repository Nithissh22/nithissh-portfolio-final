const urls = [
  'https://open.spotify.com/track/45THyhjDbYhNU7bDrTTUK6',
  'https://open.spotify.com/track/5s7RgkBdnvZH9LmaXSchnq',
  'https://open.spotify.com/track/3YH8zD0ycqxKtk6xTyW4w3',
  'https://open.spotify.com/track/1uQU9b93tlMlMoZ0h2bRgf'
];

Promise.all(urls.map(u => 
  fetch(u)
    .then(r => r.text())
    .then(html => {
      const match = html.match(/<meta property="og:image" content="([^"]+)"/);
      return u + ' : ' + (match ? match[1] : 'NOT FOUND');
    })
)).then(res => res.forEach(r => console.log(r)));
