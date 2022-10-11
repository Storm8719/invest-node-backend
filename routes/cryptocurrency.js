const {Router} = require('express')
const router = Router()
const AlphavantageApi = require("../models/alphavantage-api")
const api = new AlphavantageApi()
const db = require("../models/temp-db");

router.get('/get-crypto-assets-list', async (req, res) =>{
    const assetsList = db.crypto.map((el) => {
        return {id:el.id, from:el.name, to:"USD"}
    });
    res.status(200);
    res.send(assetsList);
});

router.post('/', async (req, res) =>{
    switch (req.body.action){
        case "getQuotesForAsset":
            const result = await api.getQuotesForAsset(req.body.data.currency, req.body.data.assetId);
            res.status(200);
            res.send(result);
            break;
        case "get-history2":

            return ;
        default:
            res.send(req.body);
    }
    console.log(req.body);
})


module.exports = router