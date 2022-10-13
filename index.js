// import api from "./models/tinkoff-api";
import express from "express";
import path from "path";
import cors from "cors";
import config from "./config";
import { TinkoffInvestApi, SandboxAccount } from 'tinkoff-invest-api';

const app = express()
import cryptocurrency from "./routes/cryptocurrency"

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api', cryptocurrency);

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/t', async (req, res) => {
    res.status(200);
    res.send('123');
})

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})