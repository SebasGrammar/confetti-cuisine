const homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscribersController = require("./controllers/subscribersController"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    dbURL = "mongodb://localhost:27017/confetti_cuisine";

const express = require("express"),
    app = express();

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts)
app.use(express.static("public"))

const Subscriber = require("./models/subscriber");
// Now I can create instances of the
// Subscriber module or make calls on that model within the main application file.

// https://stackoverflow.com/questions/18629327/adding-css-file-to-ejs

mongoose.Promise = global.Promise

mongoose.connect(dbURL, {
    useNewUrlParser: true
})

const db = mongoose.connection;


db.once("open", () => {
    console.log("Succesfully connected to MongoDB using Mongoose!")
})

Subscriber.create({
    name: "Mateo Palacio",
    email: "teo-palacio@hotmail.com"
}, (error, savedDocument) => {
    if (error) console.log(error);
    //console.log(savedDocument)
})

let mateo = Subscriber.findOne({ name: "Mateo Palacio" }).where("email", /palacio/)
console.log(mateo)

/**************************************************/

// const express = require("express"),
//     app = express();

// app.set("view engine", "ejs");
// app.use(layouts)
// app.use(express.static("public"))

//app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public/css/confetti_cuisine.css'));
//console.log("Below!")
//console.log(__dirname + "/public");

// app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    // res.send("Welcome to Confetti Cuisine!")
    res.render("index")
});


app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());


app.get("/courses", homeController.showCourses);
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
    console.log(req.data)
    console.log(Array.isArray(req.data))
    res.render("subscribers", { subscribers: req.data })
    //res.send(req.data)
});

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);


app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`)
});