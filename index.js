const express = require('express')
const app = express()
const path = require('path')
const AlphavantageApi = require("./models/alphavantage-api")
const cors = require("cors");
const bodyParser = require("express");
const api = new AlphavantageApi()
const db = require("./models/temp-db");

const allowedOrigins = ['*', 'http://localhost:3020', 'http://localhost:3000/'];

// app.use(cors({
//     origin: function(origin, callback){
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.indexOf(origin) === -1){
//             const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
//
// }));


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/api/get-crypto-assets-list', async (req, res) =>{
    const assetsList = db.crypto.map((el) => {
        return {from:el.name, to:"USD"}
    });
    setTimeout(()=>{
        res.status(200);
        res.send(assetsList);
    }, 1500)

});
app.post('/api', async (req, res) =>{

    switch (req.body.action){
        case "getQuotesForAsset":
            const result = await api.getQuotesForAsset(req.body.data.currency, req.body.data.symbol);
            res.status(200);
            res.send(result);
            break;
        case "get-history2":

            return ;
        default:
            res.send(req.body);
    }
    console.log(req.body);

    // console.log(req.body);
    //
})

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})