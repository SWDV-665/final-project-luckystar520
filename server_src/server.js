// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
const dbURI = "mongodb+srv://admin:testTEST1234@cluster1.fttfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/groceries");
mongoose.connect(dbURI);

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Paste = mongoose.model('Paste', {
    content: String
});


// Get all paste items
app.get('/api/paste', function(req, res) {

    console.log("Listing paste items...");

    //use mongoose to get all paste in the database
    Paste.find(function(err, pasteItems) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(pasteItems); // return all paste in JSON format
    });
});

// Create a paste Item
app.post('/api/paste', function(req, res) {

    console.log("Creating paste item...");

    Paste.create({
        content: req.body.content,
        done: false
    }, function(err, paste) {
        if (err) {
            res.send(err);
        }

        // create and return all the groceries
        Paste.find(function(err, pasteItems) {
            if (err)
                res.send(err);
            res.json(pasteItems);
        });
    });

});

// Update a paste Item
app.put('/api/paste/:id', function(req, res) {
    const paste = {
        content: req.body.content
    };
    console.log("Updating item - ", req.params.id);
    Paste.update({ _id: req.params.id }, paste, function(err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a paste Item
app.delete('/api/paste/:id', function(req, res) {
    Paste.remove({
        _id: req.params.id
    }, function(err, paste) {
        if (err) {
            console.error("Error deleting paste ", err);
        } else {
            Paste.find(function(err, pasteItmes) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(pasteItmes);
                }
            });
        }
    });
});


// Start app and listen on port 8101  
app.listen(process.env.PORT || 8101);
console.log("Paste server listening on port  - ", (process.env.PORT || 8101));