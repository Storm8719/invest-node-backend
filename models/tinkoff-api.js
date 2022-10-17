import {TinkoffInvestApi} from 'tinkoff-invest-api';
import config from "../config";
import axios from "axios";

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
        console.log(process.env.HTTP_PROXY);
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
    subscribeOnCandles: async (candleReceiver) => {
        const unsubscribe = await user_api.stream.market.candles({
            instruments: [
                { figi: "BBG004S681W1", interval: 1}
            ],
            waitingClose: false,
        }, candleReceiver);

        user_api.stream.market.on('error', error => console.log('stream error', error));
        user_api.stream.market.on('close', error => console.log('stream closed, reason:', error));

        return unsubscribe;
    },
    getShares: async () =>{
        try{
            const sharesList = await user_api.instruments.shares({});
            return  sharesList.instruments
                .filter(i => i.currency === "rub")
                .map((e) => {
                return {
                    ticker: e.ticker,
                    name: e.name,
                    figi: e.figi,
                    sector: e.sector,
                }
            })
        }catch (e){
            console.log(e)
            return {status: "no connection"};
        }
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