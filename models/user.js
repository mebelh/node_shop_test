const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    reqited: true,
                    default: 1,
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    res: "Course",
                    reqited: true,
                },
            },
        ],
    },
});

module.exports = model("Users", userSchema);
