// import api from "./models/tinkoff-api";

import express from "express";
import path from "path";
import cors from "cors";
import api from "./models/tinkoff-api";
const app = express()
import cryptocurrency from "./routes/cryptocurrency"
import axios from "axios";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api', cryptocurrency);

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/sandbox-accounts', async (req, res) => {
    res.status(200);
    const accounts = await api.getSandboxAccounts();
    res.send('123');
})

app.get('/openNewSandboxAccount', async (req, res) => {
    res.status(200);
    const accounts = await api.openNewSandboxAccount();
    res.send('123');
})

app.get('/ip', async (req, res) => {
    res.status(200);
    const result = await axios.get('http://ip-api.com/json/');
    console.log(result);
    res.send(result.data);
})


app.get('/users', async (req, res) => {
    res.status(200);
    const accounts = await api.getRealAccounts();
    res.send('123');
})

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})