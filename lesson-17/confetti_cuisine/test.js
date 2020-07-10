// const mongoose = require("mongoose"),
//     Course = require("./models/course"),
//     Subscriber = require("./models/subscriber");

// let testCourse, testSubscriber;

// // mongoose.connect(
// //     "mongodb://localhost:27017/recipe_db",
// //     { useNewUrlParser: true }
// // );

// mongoose.connect(
//     "mongodb://localhost:27017/confetti_cuisine",
//     { useNewUrlParser: true }
// );

// // console.log(Subscriber)

// Course.create({
//     title: "Tomato Land",
//     description: "Locally farmed tomatoes only",
//     zipCode: 12345,
//     items: ["cherry", "heirloom"]
// }).then(course => { testCourse = course }).then(result => console.log(result)
// );

// Subscriber.findOne({}).then((subscriber) => {
//     console.log("Running...")
//     console.log(subscriber)
//     testSubscriber = subscriber
// })
// .catch(error => {
//     console.log(error)
// })
// .then();

// // Subscriber.create({
// //     name: "Sebastian P.",
// //     email: "sebasgrammar@hotmail.com",
// //     zipCode: 12345
// // })
// // .then(subscriber => {
// //     testSubscriber = subscriber
// // });

// testSubscriber.courses.push(testCourse);
// testSubscriber.save();

// Subscriber.populate(testSubscriber, "courses").then(subscriber =>
//     console.log(subscriber)
// );

/*********/

const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    Course = require("./models/course");

var testCourse, testSubscriber;

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

Subscriber.remove({})
    .then(items => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return Course.remove({});
    })
    .then(items => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return Subscriber.create({
            name: "Sebastian",
            email: "sebas@gmail.com",
            zipCode: "12345"
        });
    })
    .then(subscriber => {
        console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Subscriber.findOne({
            name: "Sebastian"
        });
    })
    .then(subscriber => {
        testSubscriber = subscriber;
        console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Course.create({
            title: "Tomato Land",
            description: "Locally farmed tomatoes only",
            zipCode: 12345,
            items: ["cherry", "heirloom"]
        });
    })
    .then(course => {
        testCourse = course;
        console.log(`Created course: ${course.title}`);
    })
    .then(() => {
        testSubscriber.courses.push(testCourse);
        testSubscriber.save();
    })
    .then(() => {
        return Subscriber.populate(testSubscriber, "courses");
    })
    .then(subscriber => console.log(subscriber.courses[0])) // For some reason, this only works here... // I Guess it's because the functions below are not returning anything? :D
    .then(subscriber => console.log("SUBSCRIBER"))
    //.then(subscriber => console.log(subscriber.courses))
    .then(() => {
        return Subscriber.find({
            courses: mongoose.Types.ObjectId(testCourse._id)
        });
    })
    .then(subscriber => {
        console.log(subscriber)
        console.log(subscriber.courses)
    })
    .catch(error => {
        console.log(`Error: ${error}`)
    });