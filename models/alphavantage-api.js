const axios = require('axios');
const config = require('../config')

class AlphavantageApi {
    constructor(currency_name = "USD", api_token = config.alphavantage_api_token) {
        this.api_endpoint = 'https://www.alphavantage.co/query';
        this.api_token = api_token;
        this.currency_name = currency_name;
    }

    getDigitalCurrencyDaily = async function( currency_name ){
        const response = await axios.get(`${this.api_endpoint}?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=${this.currency_name}&apikey=${this.api_token}`);
        return response.data["Time Series (Digital Currency Daily)"];
    }

}
module.exports = AlphavantageApi;