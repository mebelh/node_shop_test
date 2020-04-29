const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
    courses: [
        {
            course: {
                type: Object,
                required: true,
            },
            count: {
                type: Number,
                required: true,
            },
        },
    ],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: false,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("Orders", orderSchema);
