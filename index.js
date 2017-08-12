const fs = require('fs');
const liburl = require('url');
const ejs = require('ejs');
const Express = require('express');

const counter = new Map();
const app = Express();

const template = ejs.compile(fs.readFileSync('./template.ejs', 'utf8'));

const images = [];
for (let idx = 0; idx < 10; idx++) {
  images.push(fs.readFileSync(`./imgs/${idx}.png`, 'base64'));
}

app.get('/', (req, res) => {
  const origin =
    liburl.parse(req.headers['referer'] || '').host;
  const count = (counter.get(origin) || 0) + 1;
  counter.set(origin, count);

  const svg = template({
    images,
    width: 68,
    height: 150,
    numbers: `${count}`.split(''),
  });
  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.listen(process.env.PORT || 3000);
