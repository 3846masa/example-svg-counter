const fs = require('fs');
const ejs = require('ejs');

const template = ejs.compile(fs.readFileSync('./template.ejs', 'utf8'));

const images = [];
for (let idx = 0; idx < 10; idx++) {
  images.push(fs.readFileSync(`./imgs/${idx}.png`, 'base64'));
}

const count = 1234567890;
const svg = template({
  images,
  width: 68,
  height: 150,
  numbers: `${count}`.split(''),
});

fs.writeFileSync('./export.svg', svg);
