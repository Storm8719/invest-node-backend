import api from "../models/tinkoff-api";

const resolver = {
    test() {
        return "123"
    },
    async getSandboxAccounts(){
        return await api.getSandboxAccounts();
    },
    async getRealAccounts(){
        return await api.getRealAccounts();
    }

}

// const resolverTinkoff = api;

export default resolver