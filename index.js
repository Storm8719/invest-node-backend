import config from "./config";

process.env.HTTP_PROXY=config.proxy;
process.env.HTTPS_PROXY=config.proxy;

import express from "express";
import path from "path";
import cors from "cors";
import api from "./models/tinkoff-api";
const app = express()
const expressWs = require('express-ws')(app);
import cryptocurrency from "./routes/cryptocurrency"
import axios from "axios";
import db from "./models/temp-db";
import {graphqlHTTP} from 'express-graphql';
import schema from "./graphql/schema";
import resolver from "./graphql/resolver";
import websocketHandler from "./ws/ws";
import websocketServerHandler from "./ws/ws";
import websocketController from "./ws/ws";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use('/api', cryptocurrency);

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})


app.get('/subscribeOnCandles', async (req, res) => {
    const unsubscribeOnCandles = api.subscribeOnCandles((candle) => {
        console.log(candle);
    });
    res.status(200);
    res.send('subscribeOnCandles');
})

//Method to call api methods directly
app.get("/m", async (req, res) => {
    if (process.env.NODE_ENV !== "dev"){
        res.status(404);
        res.send("404");
        return;
    }
    if(typeof req.query.m !== 'undefined' && typeof api[req.query.m] === "function"){
        const result = await api[req.query.m]();
        res.send(result);
    }else{
        res.status(404);
        res.send("404");
    }
})

app.get('/getSharesFromCache', async (req, res) => {
    res.send(db.shares_ru.map((e) =>{
        return {
            ticker: e.ticker,
            name: e.name,
            figi: e.figi,
            sector: e.sector,
        }
    }));
})

new websocketController(expressWs.getWss());

app.ws('/ws', function(wss, req) {
    // wss.on('message', (msg) => {
    //     console.log(msg);
    // });
});

app.use(graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}))

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})