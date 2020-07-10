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
const usersController = require("./controllers/usersController");
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

// https://www.tutorialkart.com/mongodb/mongodb-delete-database/

Subscriber.create({
    name: "Sfggggs",
    email: "aaaaafwso@hotmail.com",
    zipCode: 42138,
    courses: []
}, (error, savedDocument) => {
    if (error) console.log(error);
    //console.log(savedDocument)
})

let mateo = Subscriber.findOne({ name: "Mateo Palacio" }).where("email", /palacio/)
//console.log(mateo)

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
// app.get("/users", subscribersController.index);
app.get("/users", subscribersController.index, usersController.indexView); // doesn't work... don't konw why

// app.get("/subscribers", subscribersController.index, (req, res, next) => { // this one works.. but...
//     res.render("subscribers", { subscribers: req.data })
// });

app.get("/users/:id", usersController.show, usersController.showView)

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);

app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`)
});