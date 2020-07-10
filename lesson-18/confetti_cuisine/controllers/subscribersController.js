const Subscriber = require("../models/subscriber"),
    User = require("../models/user");

module.exports = {

    getSubscriptionPage(req, res) {
        res.render("contact")
    },

    saveSubscriber(req, res) {
        let newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        newSubscriber.save()
            .then(result => {
                res.render("thanks")
            })
            .catch(error => {
                if (error) res.render("error")
            })
    },

    // getAllSubscribers(req, res) {
    //     Subscriber.find({})
    //         .exec()
    //         .then(subscribers => {
    //             console.log(subscribers)
    //             res.render("subscribers", {
    //                 subscribers
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error.message)
    //             return []
    //         })
    //         .then(() => {
    //             console.log("Promise completed.")
    //         })
    // },

    index(req, res) {
        User.find({})
            .then(users => {
                res.render("../views/users/index", {
                    users
                })
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`)
                res.redirect("/");
            });
    }


};


// index(req, res) {
//     User.find({})
//         .then(users => {
//             res.render("users/index", {
//                 users: users
//             })
//         })
//         .catch(error => {
//             console.log(`Error fetching users: ${error.message}`)
//             res.redirect("/");
//         });
// };


// exports.getSubscriptionPage = (req, res) => {
//     res.render("contact");
// };

// exports.saveSubscriber = (req, res) => {
//     let newSubscriber = new Subscriber({
//         name: req.body.name,
//         email: req.body.email,
//         zipCode: req.body.zipCode
//     });
//     newSubscriber.save()
//         .then(result => {
//             res.render("thanks")
//         })
//         .catch(error => {
//             if (error) res.render("error")
//         })
// };

// exports.getAllSubscribers = (req, res) => {
//     Subscriber.find({})
//         .exec()
//         .then(subscribers => {
//             console.log(subscribers)
//             res.render("subscribers", {
//                 subscribers
//             })
//         })
//         .catch(error => {
//             console.log(error.message)
//             return []
//         })
//         .then(() => {
//             console.log("Promise completed.")
//         })
// }
