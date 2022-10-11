const express = require('express')
const app = express()
const path = require('path')
const cors = require("cors");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/crypto', require('./routes/cryptocurrency'));

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})