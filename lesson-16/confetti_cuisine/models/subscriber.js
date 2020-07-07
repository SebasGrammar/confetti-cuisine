const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema({ // This is an instance of mongoose.Schema -> an schema
        name: String,
        email: String,
        zipCode: Number
    });

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