const express = require('express');
const mongo = require("mongodb").MongoClient
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(4200, () => {
    console.log('Example app listening on port 4200!');
});
