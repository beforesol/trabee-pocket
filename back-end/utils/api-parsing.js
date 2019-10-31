const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const Country = require('./models/country');

const request = require('request');

const url = 'http://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?serviceKey=6UuRcLliRjeNtE%2BFMDAGWD4xS8IjaSeK1lvwKz2gxSYosN9qk1qx47WZhmSQqk2N7WGNvWk%2Blh9pEZannSf9oA%3D%3D&numOfRows=197&pageNo=1';

request({
  url: url,
  method: 'GET'
}, function (error, response, body) {
  const countryMap = [];
  parser.parseString(body, function(err, result) {
    const items = result.response.body[0].items[0].item;

    items.forEach(item => {
      const country = {
        id: item.id[0],
        name: item.countryName[0],
        en: item.countryEnName[0],
        imgUrl: item.imgUrl[0]
      }
      const newItem = countryMap.some((map, index) => {
        if (map.continent === item.continent[0]) {
          countryMap[index].countries.push(country);
          return true;
        }
      });

      if (!newItem) {
        countryMap.push({
          continent: item.continent[0],
          countries: [country]
        });
      }
    })
  });


  countryMap.forEach(map => {
    const countryDB = new Country();
 
    countryDB.continent = map.continent;
    countryDB.countries = map.countries;

    countryDB.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
    });
  })
});
