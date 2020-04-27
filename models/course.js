const { Schema, model } = require("mongoose");

const course = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        req: "User",
    },
});

module.exports = model("Course", course);
