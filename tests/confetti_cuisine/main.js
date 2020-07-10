// const homeController = require("./controllers/homeController"),
//     errorController = require("./controllers/errorController"),
//     subscribersController = require("./controllers/subscribersController"),
//     layouts = require("express-ejs-layouts"),
//     mongoose = require("mongoose"),
//     dbURL = "mongodb://localhost:27017/confetti_cuisine";

// const Subscriber = require("./models/subscriber");
// const usersController = require("./controllers/usersController");

// const express = require("express"),
//     router = express.Router(),
//     app = express();

// app.set("port", process.env.PORT || 3000);
// app.set("view engine", "ejs");

// const methodOverride = require("method-override");
// router.use(methodOverride("_method", {
//     methods: ["POST", "GET"]
// }));

// // app.set("port", process.env.PORT || 3000);
// // app.set("view engine", "ejs");
// router.use(layouts)
// router.use(express.static("public"))

// // const Subscriber = require("./models/subscriber");
// // const usersController = require("./controllers/usersController");
// // Now I can create instances of the
// // Subscriber module or make calls on that model within the main application file.

// // https://stackoverflow.com/questions/18629327/adding-css-file-to-ejs

// mongoose.Promise = global.Promise

// mongoose.connect(dbURL, {
//     useNewUrlParser: true
// })

// const db = mongoose.connection;


// db.once("open", () => {
//     console.log("Succesfully connected to MongoDB using Mongoose!")
// })

// // https://www.tutorialkart.com/mongodb/mongodb-delete-database/

// Subscriber.create({
//     name: "Sfggggs",
//     email: "aaaaafwso@hotmail.com",
//     zipCode: 42138,
//     courses: []
// }, (error, savedDocument) => {
//     if (error) console.log(error);
//     //console.log(savedDocument)
// })

// let mateo = Subscriber.findOne({ name: "Mateo Palacio" }).where("email", /palacio/)
// //console.log(mateo)

// /**************************************************/

// // const express = require("express"),
// //     app = express();

// // app.set("view engine", "ejs");
// // app.use(layouts)
// // app.use(express.static("public"))

// //app.use(express.static(__dirname + '/public'));
// //app.use(express.static(__dirname + '/public/css/confetti_cuisine.css'));
// //console.log("Below!")
// //console.log(__dirname + "/public");

// // app.set("port", process.env.PORT || 3000);

// router.get("/", (req, res) => {
//     // res.send("Welcome to Confetti Cuisine!")
//     res.render("index")
// });


// router.use(
//     express.urlencoded({
//         extended: false
//     })
// );
// router.use(express.json());


// router.get("/courses", homeController.showCourses);
// // app.get("/users", subscribersController.index);
// router.get("/users", subscribersController.index, usersController.indexView); // doesn't work... don't konw why


// router.get("/subscribers", subscribersController.index, subscribersController.indexView);
// router.get("/subscribers/new", subscribersController.new);

// router.get("/subscribers/:id/edit", subscribersController.edit);
// router.put(
//     "/subscribers/:id/update",
//     subscribersController.update,
//     subscribersController.redirectView
// );

// // app.get("/subscribers", subscribersController.index, (req, res, next) => { // this one works.. but...
// //     res.render("subscribers", { subscribers: req.data })
// // });

// // app.get("/users/:id/edit", usersController.edit);
// // app.put("/users/:id/update", usersController.update, usersController.redirectView);

// router.get("/users/:id", usersController.show, usersController.showView)
// router.get("/users/:id/edit", usersController.edit);
// router.put("/users/:id/update", usersController.update, usersController.redirectView);


// router.get("/contact", subscribersController.getSubscriptionPage);
// router.post("/subscribe", subscribersController.saveSubscriber);

// router.get("/users/new", usersController.new);
// router.post("/users/create", usersController.create, usersController.redirectView);

// router.get("/contact", homeController.showSignUp);
// router.post("/contact", homeController.postedSignUpForm);

// router.use(errorController.pageNotFoundError);
// router.use(errorController.internalServerError);

// app.use("/", router);

// app.listen(app.get("port"), () => {
//     console.log(`Server running at http://localhost:${app.get("port")}`)
// });

"use strict";

const express = require("express"),
    app = express(),
    router = express.Router(),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    errorController = require("./controllers/errorController"),
    homeController = require("./controllers/homeController"),
    subscribersController = require("./controllers/subscribersController"),
    usersController = require("./controllers/usersController"),
    coursesController = require("./controllers/coursesController"),
    Subscriber = require("./models/subscriber");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
);

router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

router.use(express.json());
router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
    "/subscribers/create",
    subscribersController.create,
    subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
    "/subscribers/:id/update",
    subscribersController.update,
    subscribersController.redirectView
);
router.delete(
    "/subscribers/:id/delete",
    subscribersController.delete,
    subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);

router.post("/subscribe", subscribersController.saveSubscriber);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
