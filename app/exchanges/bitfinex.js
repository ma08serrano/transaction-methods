const qs = require("querystring");
const axios = require("axios");
const util = require("util");
const { encrypt_sha384 } = require("../util/common");


function nonce(){
  return new Date().getTime().toString();
}

async function get_wallet_balance(base_url, api_key, secret, wallet_type, currency){

  let url = '/v1/history'
  let req_body = {
    request: url,
    nonce: nonce(),
    currency
  };

  const payload = new Buffer.from(JSON.stringify(req_body)).toString('base64')

  let options = {
    method: 'POST',
    headers: { 'X-BFX-APIKEY': api_key, 'X-BFX-PAYLOAD': payload, 'X-BFX-SIGNATURE': encrypt_sha384(secret, payload) },
    body: JSON.stringify(req_body) ,
    url: base_url + url
  }

  console.log("req data ",req_body);
  console.log("options ",options);

  const response = await axios(options)

  const data = response.data[0];
  console.log("returned data ",data);
  let balance = parseFloat(data['balance']);

  console.log(util.format('balance - %s - %s: %d', wallet_type, currency, balance));

  return parseFloat(balance);

}

module.exports = {
  get_wallet_balance
}
