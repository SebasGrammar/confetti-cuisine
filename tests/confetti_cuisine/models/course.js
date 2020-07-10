const mongoose = require("mongoose"),
    courseSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true

        },

        description: {
            type: String,
            required: true
        },

        zipCode: {
            type: Number,
            min: [10000, "Zip code too short"],
            max: 99999
        }
    });

// https://stackoverflow.com/questions/40297234/what-is-the-relevance-of-first-string-parameter-in-mongoose-model-method

/*

You could add a subscribers property to the Course model that stores a reference to the
subscribers by each subscriber’s ObjectId, which comes from MongoDB. Then you’d reference
the Mongoose model name, Subscriber, like so: subscribers: [{type: mongoose
.Schema.Types.ObjectId, ref: "Subscriber"}].

*/

module.exports = mongoose.model("Course", courseSchema)