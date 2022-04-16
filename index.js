const axios = require('axios');
const scrapingbee = require('scrapingbee');

axios.get('https://app.scrapingbee.com/api/v1', {
  params: {
    api_key:
      'ZND291ZX38WX6V0O1HHHPJ0WYEIKEWLX8RG1XLVEFC0PNZVXZBN5V2WFOHIMOI2CNDKS7LL4P0XIKBQB',
    url: 'https://rosecityresource.streetroots.org/#/results?category=Food%20Boxes&',
  },
});

async function get(url) {
  const client = new scrapingbee.ScrapingBeeClient(
    'ZND291ZX38WX6V0O1HHHPJ0WYEIKEWLX8RG1XLVEFC0PNZVXZBN5V2WFOHIMOI2CNDKS7LL4P0XIKBQB'
  );
  const response = await client.get({
    url: url,
    params: {
      extract_rules: {
        resource: {
          selector: '.card-map-container',
          type: 'list',
          output: {
            title: '.card-listing',
            address: '.card-street',
            phone: '.card-phone',
            description: '.card-content',
            hours: '.card-title-flex + .card-content',
          },
        },
      },
    },
  });
  return response;
}
get('https://rosecityresource.streetroots.org/#/results?category=Food%20Boxes&')
  .then(function (response) {
    const decoder = new TextDecoder();
    const text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log('A problem occurs : ' + e.response.data));
