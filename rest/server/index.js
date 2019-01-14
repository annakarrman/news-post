/* Import */
var express     = require("express");
var bodyParser  = require("body-parser");
var path        = require("path");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/newspost", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var newsPost = require("./models/newsPost");

// express
var app = express();

// MIDDLEWARE
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
});

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create static search path
app.use(express.static(path.join(__dirname, "public")));

// get all newsposts
app.get("/api/newsposts", function(req, res) {
    newsPost.find(function(err, newsPost) {
        if(err) {
            res.json(err);
        } else {
            res.json(newsPost);
        }
    });
});

// get newsposts from specifik ID
app.get("/api/newsposts/:id", function(req, res) {
    newsPost.findById(req.params.id, function(err, newsPost) {
        if(err) {
            res.json(err);
        } else {
            res.json(newsPost);
        }
    });
});

// post new newsposts
app.post("/api/newsposts/add", function(req,res) {
    var post = new newsPost();

    post.title = req.body.title;
    post.text = req.body.text;

    post.save(function(err) {
        if(err) {
            res.json(err);
        } else {
            res.json({msg: "Nyhetspost lagrad!"});
        }
    });
});

// update newspost
app.put("/api/newsposts/:id", function(req,res) {
    newsPost.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        text: req.body.text,
    }).then(newsPost => {
        res.json({msg: "Nyhet uppdaterad!"})
    });
});

// remove newspost
app.delete("/api/newsposts/delete/:id", function(req, res) {
    newsPost.remove({_id: req.params.id}, function(err) {
        if(err) {
            res.json(err);
        } else {
            res.json({msg: "Nyhetspost raderad!"});
        }
    });
});



// port for connection
var port = process.env.PORT || 1234;

// start server
app.listen(port, function() {
    console.log("Server startad på port: " + port);
})