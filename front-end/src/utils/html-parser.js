import axios from 'axios';

axios.get('https://kr.fxexchangerate.com/currency-exchange-rates.html').then(result => {
  const dom = document.createElement('div');

  dom.id = 'test';
  dom.innerHTML = result.data;

  const resultArray = [];
  const continentList = dom.querySelectorAll('.pure-table');

  Array.from(continentList).forEach(t => {
    const continent = t.querySelectorAll('tr');

    Array.from(continent).forEach((item, index) => {
      if (index > 0) {
        const td = item.querySelectorAll('td');
        let country = td[1].querySelector('a').innerHTML.split(' ');
        const enCurrency = td[2].querySelector('a').innerHTML;
        let koCurrency;
        const rate = td[3].innerHTML;

        if (country.length > 1) {
          koCurrency = country.splice(-1, 1);
          if (koCurrency[0] === '') {
            koCurrency = country.splice(-1, 1);
          }
          country = country.join(' ');
        } else {
          country = country[0];
          koCurrency = '';
        }

        resultArray.push({
          country,
          currency: {
            ko: koCurrency[0],
            en: enCurrency,
            rate
          }
        });
      }
    });
  });

  axios.get('/api/select').then(response => {
    const serverData = response.data;
  
    serverData.forEach(item => {
      item.countries.forEach(country => {
        resultArray.forEach(data => {
          if (country.name.indexOf(data.country) !== -1) {
            Object.assign(country, data);
          }
        })
      })
    })

    axios.post('/api/select/merge', { serverData });
  });
});