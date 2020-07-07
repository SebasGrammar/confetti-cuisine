const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    dbURL = "mongodb://localhost:27017/recipe_db";

mongoose.connect(dbURL, { useNewUrlParser: true })

mongoose.connection;

let contacts = [
    {
        name: "Sebas Palacio",
        email: "sebasgrammar@hotmail.com",
        zipCode: 53452
    },

    {
        name: "Mateo",
        email: "bababa@hotmail.com",
        zipCode: 634645
    },

    {
        name: "Ratatouille",
        email: "ratatouilel@gmail.com",
        zipCode: 24324
    }

]

Subscriber.deleteMany({})
    .exec()
    .then(() => {
        console.log("Subscriber data is empty!");
    });

let commands = []

contacts.forEach(contact => {
    commands.push(Subscriber.create({
        name: contact.name,
        email: contact.email
    }))
})

Promise.all(commands)
    .then(response => {
        console.log(JSON.stringify(response))
        mongoose.connection.close()
    }).catch(error => {
        console.log(`ERROR: ${error}`)
    })