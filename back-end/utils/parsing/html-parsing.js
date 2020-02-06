const request = require('request');
const cheerio = require('cheerio');

request({
  url: 'https://fxtop.com/kr/countries-currencies.php',
  method: 'GET'
}, function (error, response, html) {
  const $ = cheerio.load(html);
  const tbody = $('table')['21'].children[1].children;

  console.log(tbody);
})