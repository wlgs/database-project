require('dotenv').config()

const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const { exit } = require('process');
const uri = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_ATLAS_URL + "/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var col_clients,
    col_reviews,
    col_rooms,
    col_rooms_types,
    col_employees,
    col_work_types,
    col_reservations

var allowedOrigins = ['http://localhost:4200'];

app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));


client.connect(err => {
    console.log("Trying to connect to db...")
    if (err) throw err;
    console.log("Retrieving collections...")
    col_clients = client.db("warsaw").collection("clients");
    col_reviews = client.db("warsaw").collection("reviews");
    col_rooms_types = client.db("warsaw").collection("rooms_types");
    col_rooms = client.db("warsaw").collection("rooms");
});


app.get('/clients/:id', (req, res) => {
    console.log("Got request for -> clients/", req.params.id);
    col_clients.findOne({ _id: req.params.id }, (err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.get('/clients', (req, res) => {
    console.log("Got request for -> /clients");
    if (req.query.skip == undefined || req.query.limit == undefined) {
        res.status(400).send("Bad params provided");
        return
    }
    col_clients.find({}).sort({ _idx: 1 }).limit(Number(req.query.limit)).skip(Number(req.query.skip)).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })



});

app.get('/reviews', (req, res) => {
    console.log("Got request for -> /reviews");
    if (req.query.skip == undefined || req.query.limit == undefined) {
        res.status(400).send("Bad params provided");
        return
    }
    col_reviews.find({}).sort({ _idx: 1 }).limit(Number(req.query.limit)).skip(Number(req.query.skip)).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.get('/reviews/:id', (req, res) => {
    console.log("Got request for -> reviews/", req.params.id);
    col_reviews.findOne({ _id: req.params.id }, (err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.get('/rooms_types', (req, res) => {
    console.log("Got request for -> /rooms_types");
    col_rooms_types.find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.get('/rooms', (req, res) => {
    console.log("Got request for -> /rooms");
    col_rooms.find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.get('/rooms/:number', (req, res) => {
    console.log("Got request for -> /rooms/", req.params.number);
    col_rooms.findOne({ room_number: req.params.number }, (err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.listen(4269, () => {
    console.log('Example app listening on port 4269!');
});