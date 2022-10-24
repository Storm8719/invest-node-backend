import {Helpers, TinkoffInvestApi} from 'tinkoff-invest-api';
import config from "../config";
import axios from "axios";
import db from "./temp-db";

process.env.HTTP_PROXY=config.proxy;
process.env.HTTPS_PROXY=config.proxy;


const sandbox_api = new TinkoffInvestApi({ token: config.tinkoff_api_sandbox_token });

const user_api = new TinkoffInvestApi({ token: config.tinkoff_api_token });

const api = {
    openNewSandboxAccount : async () => {
        const {accountId} = await sandbox_api.sandbox.openSandboxAccount({});
        return accountId;
    },
    getSandboxAccounts: async () => {
        const sb_accounts = await sandbox_api.sandbox.getSandboxAccounts({});
        console.log(sb_accounts);
        return sb_accounts;
    },
    getRealAccounts: async () => {
        const accounts = await user_api.users.getAccounts({});
        console.log(accounts);
        return accounts;
    },
    getIp: async () => {
        const https = await axios.get('https://ipapi.co/json/');
        const http = await axios.get('http://ip-api.com/json/');
        return {https: https.data, http: http.data}
    },
    subscribeOnCandles: async (candleReceiver, figi = "BBG004S681W1") => {
        console.log('Subscribe on candles event')
        const unsubscribe = await user_api.stream.market.candles({
            instruments: [
                { figi: figi, interval: 1}
            ],
            waitingClose: false,
        }, (candle) => {
            candleReceiver(candle);
            console.log(candle);
        });

        user_api.stream.market.on('error', error => console.log('stream error', error));
        user_api.stream.market.on('close', error => console.log('stream closed, reason:', error));

        return unsubscribe;
    },
    getCandles: async ({figi, timeOffset = '-45m', candleInterval = 1}) => {
        const {from, to} = Helpers.fromTo(timeOffset);

        const arr = await user_api.marketdata.getCandles({figi, from, to, interval:candleInterval});
        console.log(arr);
        return arr;
    },
    getShares: async () =>{
        const sharesList = await user_api.instruments.shares({});
        return  sharesList.instruments.filter(i => i.currency === "rub")
    },
    getSharesFromCache: () => {
        return db.shares_ru;
    }
}



// const { accounts } = await api.users.getAccounts({});
// console.log(accounts);
// api.openNewSandboxAccount();


// const api = new TinkoffInvestApi({ token: config.tinkoff_api_sandbox_token });
// // const {accountId} = await api.sandbox.openSandboxAccount({});
// const sb_accs = await api.sandbox.getSandboxAccounts({});
// console.log(sb_accs);


export default api;