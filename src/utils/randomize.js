import emmet from 'emmet';

import './pollyfill.js';

export function randomCards(n) {
  var countryList = [
    // logo, countryName, currency, symbol
    [null, 'Main', null, 'S$'],
    [1, 'Japan', 'JPY', '¥'],
    [2, 'United States', 'USD', '$'],
  ];
  var types = ['cashin', 'cashout', 'payout'];
  var data = [];
  for (var i = 0; i < n; i++) {
    var idx = Math.random()*10 % countryList.length|0;
    var [logo, country, currency, symbol] = countryList[idx];
    data[i] = {
      id: crypto.randomUUID(),
      salary: {
        quantity: Math.random()*15_000+2500|0,
        logo, country, currency, symbol,
      },
      icon: `${i}`,
      amount: Math.floor((Math.random()*1500+20)*10)/10,
      detail: emmet('lorem2-5'),
      remark: emmet('lorem2-3'),
      type: types[i%types.length],
      date: Date.now(),
      // INFO: 版权于 https://cdn.seovx.com/
      bg: `https://cdn.seovx.com/?mom=302&${performance.now()}`,
    };
  }
  return data;
}
