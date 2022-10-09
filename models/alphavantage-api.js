const axios = require('axios');
const config = require('../config')

class AlphavantageApi {
    constructor(currency_name = "USD", api_token = config.alphavantage_api_token) {
        this.api_endpoint = 'https://www.alphavantage.co/query';
        this.api_token = api_token;
        this.currency_name = currency_name;
    }

    associatedObject = {
        getQuotesForAsset:{
            func:"DIGITAL_CURRENCY_DAILY",
            ret:"Time Series (Digital Currency Daily)",
        }
    }

    getQuotesForAsset = async function( to_currency_name = this.currency_name, symbol = "BTC" ){
        const response = await axios.get(`${this.api_endpoint}?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${to_currency_name}&apikey=${this.api_token}`);
        return response.data["Time Series (Digital Currency Daily)"];
    }

    getData = async function( to_currency_name = this.currency_name, symbol = "BTC" ){
        return null;
    }

}
module.exports = AlphavantageApi;