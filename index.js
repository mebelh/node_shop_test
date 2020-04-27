const express = require("express");
const exphdbs = require("express-handlebars");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const homeRoute = require("./routes/home");
const addRoute = require("./routes/add");
const coursesRoute = require("./routes/courses");
const cardRoute = require("./routes/card");
const User = require("./models/user");

const hbs = exphdbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("5ea5b015d2d3841c50058b2e");
        req.user = user;
        console.log(user);

        next();
    } catch (e) {
        console.log(e);
    }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/add", addRoute);
app.use("/", homeRoute);
app.use("/courses", coursesRoute);
app.use("/card", cardRoute);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        const url = "mongodb+srv://memet:12345@cluster0-mjl6h.mongodb.net/shop";
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: "mem@mmm.m",
                name: "memet",
                cart: { items: [] },
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}.`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
