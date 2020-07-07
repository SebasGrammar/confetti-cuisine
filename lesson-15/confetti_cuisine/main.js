const homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscribersController = require("./controllers/subscribersController"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    dbURL = "mongodb://localhost:27017/recipe_db";
// mongoDB = require("mongodb").MongoClient,
// dbURL = "mongodb://localhost:27017",
// dbName = "recipe_db";

const Subscriber = require("./models/subscriber");

mongoose.Promise = global.Promise

//console.log(mongoDB)
//const {showCourses} = require("./controllers/homeController")

// console.log(homeController) // Yes. all exported functions are included in an object. That object receives whatever name
// we give to it.
//console.log(showCourses)

// Mongoose makes requiring mondoDB unecessary.

// mongoDB.connect(dbURL, (error, client) => {
//     if (error) throw error;

//     let db = client.db(dbName);
//     db.collection("contacts")
//     .find()
//     .toArray((error, data) => {
//         if (error) throw error;
//         console.log(data);
//     })

//     db.collection("contacts")
//     .insert({wasAdded: true}, (error, db) => {
//         if (error) throw error;
//         console.log(db)
//     })
// })

// REMEMBER TO HAVE THE MONGODB SERVER RUNNING IN THE BACKGROUND!

mongoose.connect(dbURL, {
    useNewUrlParser: true
})

const db = mongoose.connection;


db.once("open", () => {
    console.log("Succesfully connected to MongoDB using Mongoose!")
})

// const subscriberSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     zipCode: Number
// })

//const Subscriber = mongoose.model("Subscriber", subscriberSchema)



// let firstSubscriptor = new Subscriber({
//     name: "Sebastian Palacio",
//     email: "sebasgrammar@hotmail.com"
// })

// firstSubscriptor.save((error, savedDocument) => {
//     if (error) console.log(error);
//     console.log(savedDocument)

// })

/* CREATE DOES THE SAME AS USING NEW AND THEN SAVE */

Subscriber.create({
    name: "Mateo Palacio",
    email: "teo-palacio@hotmail.com"
}, (error, savedDocument) => {
    if (error) console.log(error);
    //console.log(savedDocument)
})

let mateo = Subscriber.findOne({name: "Mateo Palacio"}).where("email", /palacio/)
console.log(mateo)

/**************************************************/

const express = require("express"),
    app = express();

app.set("view engine", "ejs");
app.use(layouts)
app.use(express.static("public"))

app.set("port", process.env.PORT || 3000);

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
    res.render("subscribers", {subscribers: req.data})
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