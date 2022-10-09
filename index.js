const express = require('express')
const app = express()
const path = require('path')
const AlphavantageApi = require("./models/alphavantage-api")
const cors = require("cors");
const bodyParser = require("express");
const api = new AlphavantageApi()

const allowedOrigins = ['*',
    'http://localhost:3020'];
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }

}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/api/get-currency-history', async (req, res) =>{
    const result = await api.getDigitalCurrencyDaily();
    res.send(result);
    res.status(200);
});
app.post('/api', async (req, res) =>{

    switch (req.body.action){
        case "get-history":
            const result = await api.getDigitalCurrencyDaily();
            res.send(result);
            break;
    }
    res.status(200);
    console.log(req.body);
    res.send(req.body);
})

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})