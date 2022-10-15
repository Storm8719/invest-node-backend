import db from "./temp-db";

import axios from "axios";
import config from "../config";


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

    getQuotesForAsset = async function( to_currency_name = this.currency_name, assetId = 1){
        const symbol = db.crypto.filter(e => e.id === +assetId)[0].name;
        const response = await axios.get(`${this.api_endpoint}?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${to_currency_name}&apikey=${this.api_token}`);
        const seriesObj = response.data["Time Series (Digital Currency Daily)"];
        let seriesArr = [];
        for (let key in seriesObj){
            seriesArr.unshift({time:key, open: seriesObj[key]["1a. open (USD)"], high: seriesObj[key]["2a. high (USD)"], low: seriesObj[key]["3a. low (USD)"], close: seriesObj[key]["4a. close (USD)"] });
        }
        return seriesArr;
    }

    getData = async function( to_currency_name = this.currency_name, symbol = "BTC" ){
        return null;
    }

}
module.exports = AlphavantageApi;