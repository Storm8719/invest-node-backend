import { TinkoffInvestApi, SandboxAccount } from 'tinkoff-invest-api';
import config from "../config";

const t_api = new TinkoffInvestApi({ token: config.tinkoff_api_sandbox_token });

const api = {
    openNewSandboxAccount : async () => {
        const {accountId} = await t_api.sandbox.openSandboxAccount({});
        return accountId;
    }
}

export default api;