const https = require('https');
const fs = require('fs');

const games = [
  { file: 'uncharted4.jpg', url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/library_600x900_2x.jpg' },
  { file: 'spiderman2.jpg', url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817070/library_600x900_2x.jpg' },
  { file: 'tombraider.jpg', url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391220/library_600x900_2x.jpg' },
  { file: 'hitman3.jpg', url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659040/library_600x900_2x.jpg' }
];

const dir = 'd:/Portfolio/public/images/games/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

games.forEach(g => {
  https.get(g.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode === 200) {
      res.pipe(fs.createWriteStream(dir + g.file));
      console.log('Saved ' + g.file);
    } else {
      console.log('Failed ' + g.file + ' with status ' + res.statusCode);
    }
  }).on('error', (e) => {
    console.error(e);
  });
});
