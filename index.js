import config from "./config";

process.env.HTTP_PROXY=config.proxy;
process.env.HTTPS_PROXY=config.proxy;

import express from "express";
import path from "path";
import cors from "cors";
import api from "./models/tinkoff-api";
const app = express()
import cryptocurrency from "./routes/cryptocurrency"
import axios from "axios";
import db from "./models/temp-db";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api', cryptocurrency);

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/getSandboxAccounts' , async (req, res) => {
    res.status(200);
    const accounts = await api.getSandboxAccounts();
    res.send(accounts);
})

app.get('/openNewSandboxAccount', async (req, res) => {
    res.status(200);
    const newAccount = await api.openNewSandboxAccount();
    res.send(newAccount);
})

app.get('/ip', async (req, res) => {
    const result = await api.getIp();
    res.status(200);
    console.log(result);
    res.send(result);
})


app.get('/getRealAccounts', async (req, res) => {
    const accounts = await api.getRealAccounts();
    res.status(200);
    res.send(accounts);
})

app.get('/subscribeOnCandles', async (req, res) => {
    const unsubscribeOnCandles = api.subscribeOnCandles((candle) => {
        console.log(candle);
    });
    res.status(200);
    res.send('subscribeOnCandles');
})

app.get('/getShares',  async (req, res) => {
    const sharesList = await api.getShares();
    // console.log(sharesList);
    if(typeof sharesList.status !== "undefined" && sharesList.status === "no connection"){
        res.status(500);
    }
    res.send(sharesList);
});



const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})