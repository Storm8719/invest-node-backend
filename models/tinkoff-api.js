import { TinkoffInvestApi, SandboxAccount } from 'tinkoff-invest-api';
import config from "../config";

// создать клиента с заданным токеном доступа
// const sandbox_api = new TinkoffInvestApi({ token: config.tinkoff_api_sandbox_token });

// class Api {
//
// }

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
    getSandboxApi: () => {
        return sandbox_api;
    },
    getUsersApi: () => {
        return  user_api;
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