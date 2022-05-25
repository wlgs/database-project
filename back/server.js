require('dotenv').config()

const utils = require('./utils');
const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId, ISODate } = require('mongodb');
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
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

console.log("Trying to connect to db...")
client.connect(err => {

    if (err) throw err;
    console.log("Connected!")
    console.log("Retrieving collections...")
    col_clients = client.db("warsaw").collection("clients");
    col_reviews = client.db("warsaw").collection("reviews");
    col_rooms_types = client.db("warsaw").collection("rooms_types");
    col_rooms = client.db("warsaw").collection("rooms");
    col_reservations = client.db("warsaw").collection("reservations");
    col_employees = client.db("warsaw").collection("employees");
    console.log("Collections retrieved!")
});


app.get('/clients/:mailid', (req, res) => {
    console.log("Got request for -> client/", req.params.mailid);
    if (utils.validateEmail(req.params.mailid)) {
        console.log("email valid!")
        col_clients.findOne({ email: req.params.mailid }, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    }
    else {
        console.log("email not valid!")
        col_clients.findOne({ _id: req.params.mailid }, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
    }


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

app.get('/employees', (req, res) => {
    console.log("Got request for -> /employees");
    if (req.query.skip == undefined || req.query.limit == undefined) {
        res.status(400).send("Bad params provided");
        return
    }
    col_employees.find({}).sort({ _idx: 1 }).limit(Number(req.query.limit)).skip(Number(req.query.skip)).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

app.get('/reviews', async (req, res) => {
    console.log("Got request for -> /reviews");
    let pipeline = [
        {
            '$lookup': {
                from: 'clients',
                localField: 'client_id',
                foreignField: '_id',
                as: 'dataArr'
            }
        },
        {
            '$match': {
                'dataArr': { '$not': { '$eq': [] } }
            }
        }
    ]
    const aggCur = col_reviews.aggregate(pipeline);
    reviewsToSend = new Array();
    await aggCur.forEach(review => {
        reviewsToSend.push({
            name: review.dataArr[0].firstname + " " + review.dataArr[0].lastname,
            body: review.body,
            stars: review.stars
        })
    });
    res.status(200).send(JSON.stringify(reviewsToSend));
    // col_reviews.find({}).sort({ _idx: 1 }).limit(Number(req.query.limit)).skip(Number(req.query.skip)).toArray((err, result) => {
    //     if (err) throw err;
    //     res.send(result);
    // })

});

app.get('/reviews/:id', (req, res) => {
    console.log("Got request for -> reviews/", req.params.id);
    col_reviews.findOne({ $or: [{ _id: req.params.id }, { _id: ObjectId(req.params.id) }] }, (err, result) => {
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
    console.log("Got request for -> rooms/", req.params.number);
    col_rooms.findOne({ room_number: Number(req.params.number) }, (err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.get('/reservations/:id', async (req, res) => {
    console.log("Got request for -> reservations/", req.params.id);
    if (req.params.id.split('-').length > 1) {
        //handle date request
        console.log("DATE DETECTED");
        let pipeline = [{
            $project: {
                start_date: {
                    $toDate: "$start_date"
                },
                end_date: {
                    $toDate: '$end_date'
                },
                status: '$status',
                room_number: '$room_number'
            }
        },
        {
            $match: {
                'start_date': { $lte: new Date(req.params.id) }
            }
        },
        {
            $match: {
                'end_date': { $gte: new Date(req.params.id) }
            }
        },
        {
            $match: {
                'status': { $not: { $eq: 'canceled' } }
            }
        }]

        const aggCur = col_reservations.aggregate(pipeline);
        var results = new Array();
        console.log("DOCS:");
        await aggCur.forEach(doc => {
            console.log(doc);
            results.push(doc);
        })
        res.send(JSON.stringify(results));
        return
    }
    col_reservations.findOne({ $or: [{ _id: req.params.id }, { _id: ObjectId(req.params.id) }] }, (err, result) => {
        if (err) throw err;
        res.send(result);
    })

});

app.get('/reservations/client/:mailid', (req, res) => {
    console.log("Got request for -> reservations/client/", req.params.mailid);
    if (utils.validateEmail(req.params.mailid)) {
        console.log("email valid!")
        col_clients.findOne({ email: req.params.mailid }, (err, result) => {
            if (err) throw err;
            if (result == null || result == undefined) {
                res.send('{}')
                return
            }

            col_reservations.find({ client_id: result._id }).toArray((err, result2) => {
                if (err) throw err;
                res.send(result2);
                return
            })
        })
    }
    else {
        console.log("email not valid!")
        col_reservations.find({ client_id: req.params.mailid }).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
            return
        })
    }
});


app.post('/reviews', (req, res) => {
    console.log("Got request POST for /reviews");
    console.log(req.body);
    if (req.body.client_id == undefined || req.body.stars == undefined || req.body.body == undefined) {
        res.status(400).send("Bad params provided");
    }
    var toInsert = new Object();
    toInsert.client_id = req.body.client_id;
    toInsert.body = req.body.body;
    toInsert.stars = Number(req.body.stars);
    col_reviews.insertOne(toInsert, (err, result) => {
        if (err) throw err;
        res.status(201).send(result.insertedId);
    })

});

app.post('/reservations', async (req, res) => {
    console.log("Got request POST for /reservations");
    console.log(req.body);
    if (req.body.email == undefined || req.body.start_date == undefined || req.body.end_date == undefined || req.body.type == undefined) {
        res.status(400).send("Bad params provided");
    }

    let pipeline = [{
        $lookup: {
            from: 'reservations',
            localField: 'room_number',
            foreignField: 'room_number',
            as: 'dataArr'
        }
    },
    {
        $project: {
            room_number: '$room_number',
            type: '$type',
            dataArr: {
                $map: {
                    input: '$dataArr',
                    as: 'dataEl',
                    in: {
                        start_date: {
                            $toDate: "$$dataEl.start_date"
                        },
                        end_date: {
                            $toDate: "$$dataEl.end_date"
                        },
                        status: "$$dataEl.status"
                    }
                }
            }
        }
    },
    {
        $match: {
            $or: [{
                'dataArr': {
                    $not: {
                        $elemMatch: {
                            $or: [{ start_date: { $gte: new Date(req.body.start_date), $lte: new Date(req.body.end_date) } },
                            { end_date: { $gte: new Date(req.body.start_date), $lte: new Date(req.body.end_date) } }],

                        }
                    }
                }
            },
            {
                'dataArr': { $elemMatch: { $or: [{ status: 'canceled' }, { status: 'pending' }] } }
            }]
        }
    },
    {
        $match: {
            'type': req.body.type
        }
    }]
    var availableRoom = undefined;
    const aggCur = col_rooms.aggregate(pipeline);
    console.log("DOCS:")
    await aggCur.forEach(doc => {
        availableRoom = doc.room_number;
        console.log(doc);
    })
    if (availableRoom == undefined) {
        res.status(404).send("No room found")
        return;
    }

    col_clients.findOne({ email: req.body.email }, (err, result) => {
        if (err) throw err;

        if (result == null || result == undefined) {
            res.status(404).send("No mail found")
            return;
        }
        var toInsert = new Object();
        toInsert.start_date = req.body.start_date;
        toInsert.end_date = req.body.end_date;
        toInsert.status = "pending";
        toInsert.room_number = availableRoom;
        toInsert.client_id = result._id;

        col_reservations.insertOne(toInsert, (err, result2) => {
            if (err) throw err;
            res.send(result2);
        })
    })

});

app.patch('/reservations/:id', (req, res) => {

    if (req.body.status == undefined) {
        res.status(400).send("Bad params provided");
    }
    col_reservations.findOne({ $or: [{ _id: req.params.id }, { _id: ObjectId(req.params.id) }] }, (err, result) => {
        if (err) throw err;

        if (result == null || result == undefined) {
            res.status(404).send("Change cant be applicable because no resource exist.")
            return;
        }

        col_reservations.updateOne({ $or: [{ _id: req.params.id }, { _id: ObjectId(req.params.id) }] }, { $set: { status: req.body.status } }, (err, result2) => {
            if (err) throw err;
            console.log(result2);
            if (result2.modifiedCount > 0) {
                res.status(200).send(JSON.stringify({ change_occurred: true }));
                return;
            }
            res.status(200).send(JSON.stringify({ change_occurred: false }));
        })
    })
});

app.get('/rooms/:from/:to', async (req, res) => {
    console.log("Got request GET for /rooms");
    if (req.params.from == undefined || req.params.to == undefined) {
        res.status(400).send("Bad params provided");
    }

    let pipeline = [{
        $lookup: {
            from: 'reservations',
            localField: 'room_number',
            foreignField: 'room_number',
            as: 'dataArr'
        }
    },
    {
        $project: {
            room_number: '$room_number',
            type: '$type',
            dataArr: {
                $map: {
                    input: '$dataArr',
                    as: 'dataEl',
                    in: {
                        start_date: {
                            $toDate: "$$dataEl.start_date"
                        },
                        end_date: {
                            $toDate: "$$dataEl.end_date"
                        },
                        status: "$$dataEl.status"
                    }
                }
            }
        }
    },
    {
        $match: {
            $or: [{
                'dataArr': {
                    $not: {
                        $elemMatch: {
                            $or: [{ start_date: { $gte: new Date(req.params.from), $lte: new Date(req.params.to) } },
                            { end_date: { $gte: new Date(req.params.from), $lte: new Date(req.params.to) } }],

                        }
                    }
                }
            },
            {
                'dataArr': { $elemMatch: { status: 'canceled' } }
            }]
        }
    }]
    const aggCur = col_rooms.aggregate(pipeline);
    console.log("DOCS:")
    var resultsArray = new Array();
    await aggCur.forEach(doc => {
        console.log(doc);
        resultsArray.push({
            room_number: doc.room_number,
            type: doc.type
        })
    })
    res.send(JSON.stringify(resultsArray));
});

app.listen(4269, () => {
    console.log('Example app listening on port 4269!');
});