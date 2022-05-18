require('dotenv').config()

const express = require('express');
const app = express();
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const { exit } = require('process');
const uri = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_ATLAS_URL + "/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var col_clients

client.connect(err => {
    if (err) throw err;
    col_clients = client.db("warsaw").collection("clients");
    // col_clients.find({}).toArray( (err, res) => {
    //     if (err) throw err;
    //     console.log(res);
    // })
    // client.close();
});


app.get('/', (req, res) => {
    col_clients.find({}).toArray( (err, resArr) => {
        if (err) throw err;
        var out;
        resArr.forEach(element => {
            out = JSON.stringify(element);
        });
        res.send(out);
    })
    
});

app.listen(4200, () => {
    console.log('Example app listening on port 4200!');
});