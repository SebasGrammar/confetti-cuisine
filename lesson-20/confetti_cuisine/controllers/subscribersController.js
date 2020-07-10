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