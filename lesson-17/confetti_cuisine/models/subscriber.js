// const mongoose = require("mongoose"), // each model property can have a type assigned directly or a bunch of options passed as a JavaScript object.
//     subscriberSchema = mongoose.Schema({ // This is an instance of mongoose.Schema -> an schema
//         name: String, 
//         email: String,
//         zipCode: Number
//     });

const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
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

        courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]

        /*
        Add a courses property to subscribers that stores a reference to each associated course
        by that course’s ObjectId. The ID comes from MongoDB. Then reference the Mongoose
        model name, Course.
        */

    });

/*

IMPORTANT:

If you wanted to restrict subscribers to one course at a time, you could remove the
brackets around the property. The brackets signify an array of multiple referenced
objects. If a subscriber could sign up for only a single course, the course property would
look like the following: course: {type: mongoose.Schema.Types.ObjectId, ref: "Course"}.

*/




subscriberSchema.methods.getInfo = function () {
    return `Name: ${this.name} Email: ${this.email} Zip Code:
        ➥ ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function () {
    return this.model("Subscriber")
        .find({ zipCode: this.zipCode })
        .exec()
};

/*
 
Now that the schema is defined, I need to define a model to use this schema. In other
words, I’ve defined a set of rules, and now I need to create a model to use those rules.
 
*/


// https://mongoosejs.com/docs/2.7.x/docs/model-definition.html

/*
 
Important: the actual interaction with the data happens with the Model that you obtain through mongoose.model 
or db.model. That's the object that you can instantiate or that you can call .find(), .findOne(), etc upon. 
Don't confuse schemas and actual models!
 
*/

module.exports = mongoose.model("Subscriber", subscriberSchema);

/*

The subscriber model also lives in the subscriber.js file, but unlike the schema, the
model should be accessible by other modules in the application. For that reason, I add
the model to the module’s exports object,

*/