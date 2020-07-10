/* BROKEN CODE -> NULL. I believe it's because there is no "Jon" "associated" to my Subscriber model.

// const mongoose = require("mongoose"),
//     Subscriber = require("./models/subscriber"),
//     Course = require("./models/course"),
//     User = require("./models/user");

// mongoose.connect(
//     "mongodb://localhost:27017/confetti_cuisine",
//     { useNewUrlParser: true }
// );

// mongoose.Promise = global.Promise;

// // let testUser;

// // https://stackoverflow.com/questions/23803743/what-is-the-explicit-promise-construction-antipattern-and-how-do-i-avoid-it
// // https://stackoverflow.com/questions/47112633/variables-are-not-being-set-inside-the-then-part-of-a-promise
// // https://stackoverflow.com/questions/22536385/setting-a-variable-to-get-return-from-call-back-function-using-promise

// // User.create({
// //     name: {
// //         first: "Jon",
// //         last: "Wexler"
// //     },
// //     email: "jon@jonwexler.com",
// //     password: "pass123"
// // })
// // .then((user) => console.log(user))
// // .catch(error => console.log(error))

// /***************/

// // User.findOne({
// //     email: "jon@jonwexler.com"
// // })
// // .then(user => user)
// // .then(user => testUser = user)
// // .then(() => {
// //     console.log(`The test user is: ${testUser}`)
// // })

// // OR

// let testUser;

// User.findOne({
//     email: "jon@jonwexler.com"
// })
//     .then(user => testUser = user) // if you want to use the same promise, return it and chain it.
//     .then(() => console.log(testUser))

// let targetSubscriber;

// setTimeout(function () { // this wasn't working because this code was running before the code above, and so the variable "testUser" was not initialized yet. a little delay helps... but how do I fix this mess without having to turn to using setTimeout?
//     Subscriber.findOne({
//         email: "jon@jonwexler.com"
//     })
//         .then(subscriber => {
//             console.log(`This is the subscriber: ${subscriber}`)
//             return subscriber
//         })
//         .then(subscriber => targetSubscriber = subscriber)
//         .then(() => {
//             console.log("BELOW: ")
//             console.log(testUser)
//             console.log(targetSubscriber)
//         });
// }, 2000)

// // Subscriber.findOne({
// //     email: testUser.email
// // })
// //     .then(subscriber => targetSubscriber = subscriber)
// //     .then(() => {
// //         console.log("BELOW: ")
// //         console.log(testUser)
// //     });

/*****/

// sebasgrammar@hotmail.com"

/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/

const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    Course = require("./models/course"),
    User = require("./models/user");

mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    { useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

// let testUser;

// // User.findOne({
// //     email: "sebasgrammar@hotmail.com"
// // })
// //     .then(user => testUser = user) // if you want to use the same promise, return it and chain it.
// //     .then(() => {
// //         console.log(testUser)
// //         console.log("NULL???")
// //     })



// // RUN THIS ONCE, THEN RUN THE CODE BELOW: (AFTER A USER HAS BEEN CREATED)

// // User.create({
// //     name: {
// //         first: "Sebas",
// //         last: "P."
// //     },
// //     email: "sebasgrammar@hotmail.com",
// //     password: "pass123"
// // })
// // .then((user) => testUser = user)
// // .catch(error => console.log(error))

// User.findOne({
//     email: "sebasgrammar@hotmail.com"
// })
// .then(user => testUser = user)
// .catch(error => console.log(error))

// let targetSubscriber;

// setTimeout(function () { // this wasn't working because this code was running before the code above, and so the variable "testUser" was not initialized yet. a little delay helps... but how do I fix this mess without having to turn to using setTimeout?
//     Subscriber.findOne({
//         email: "sebasgrammar@hotmail.com"
//     })
//         .then(subscriber => {
//             console.log(`This is the subscriber: ${subscriber}`)
//             return subscriber
//         })
//         .then(subscriber => targetSubscriber = subscriber)
//         .then(() => {
//             console.log("BELOW: ")
//             console.log(testUser)
//             console.log(targetSubscriber)
//         });
// }, 2000)

/*************************************/
/*************************************/
/*************************************/
/*************************************/
/*************************************/
/*************************************/
/*************************************/
/*************************************/

let testUser;
User.create({
    name: {
        first: "Pato",
        last: "Donald "
    },
    email: "patodonald@patodonald.com",
    password: "hpl123"
})
    .then(user => {
        testUser = user;
        return Subscriber.findOne({
            email: user.email
        });
    })
    .then(subscriber => {
        testUser.subscribedAccount = subscriber;
        testUser.save().then(user => console.log("user updated"));
    })
    .catch(error => console.log(error.message));

let secondUser;
let secondSubscriber;

User.create({
    name: {
        first: "Panda",
        last: "Bear"
    },
    email: "pandabear@hotmail.com",
    zipCode: 84726,
    password: "akda82"
})
    .then(user => {
        secondUser = user
        return Subscriber.findOne({
            email: secondUser.email
        })
    })
    .then(subscriber => {
        secondUser.subscribedAccount = subscriber
        secondUser.save().then(user => console.log("second user created and saved."))
    })
    .catch(error => console.log(`Error: ${error}`))