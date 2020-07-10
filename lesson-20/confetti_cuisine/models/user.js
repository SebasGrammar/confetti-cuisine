const mongoose = require("mongoose"),
    { Schema } = mongoose,
    userSchema = new Schema({

        name: {
            first: {
                type: String,
                trim: true
            },

            last: {
                type: String,
                trim: true
            }
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },

        zipCode: {
            type: Number,
            min: [10000, "Zip code too short"],
            max: 99999
        },

        password: {
            type: String,
            required: true
        },

        courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],

        subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
    },
        { timestamps: true }
    );

/*

Given that the first and last name may occasionally be useful in one line, you can use a
Mongoose virtual attribute to store that data for each instance. A virtual attribute (also
known as a computed attribute) is similar to a regular schema property but isn’t saved in
the database. To create one, use the virtual method on your schema, and pass the property
and new virtual attribute name you’d like to use. A virtual attribute for the user’s
full name resembles the code in listing 18.2. This virtual attribute won’t be saved to the
database, but it will behave like any other property on the user model, such as user.zip-
Code. You can retrieve this value with user.fullName. Below that is a line to create the
user model.

*/

// https://stackoverflow.com/questions/50238559/mongoose-and-arrow-functions

userSchema.virtual("fullName")
    .get(function () {
        return `${this.name.first} ${this.name.last}`
    });


// subscriberSchema.methods.findLocalSubscribers = function () {
//     return this.model("Subscriber")
//         .find({ zipCode: this.zipCode })
//         .exec()
// };

// userSchema.methods.getLength = function() {
//     return this.model("User").find({{zipCode: this.zipCode}}).then(user => console.log(user.name.first.length))
// }

/*

As of the writing of this book, you won’t be able to use arrow functions here
because Mongoose methods use lexical this, on which ES6 arrow functions no longer
depend.

*/

userSchema.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount === undefined) {
        Subscriber.findOne({
            email: user.email
        })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error in connecting subscriber:
➥ ${error.message}`);
                next(error);
            });
    } else {
        next();
    }
});


module.exports = mongoose.model("User", userSchema);

/*

Test this model right away in REPL. Remember to require Mongoose and everything
needed for this environment to work with your new model. With a new REPL session,
you need to require Mongoose again, specify Mongoose to use native promises, and connect
to your database by typing mongoose.connect("mongodb://localhost:27017/recipe_db",
{useNewUrlParser: true}). Then require the new user model with const User = require
("./models/user").

*/