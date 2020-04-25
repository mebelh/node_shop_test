const express = require("express");
const exphdbs = require("express-handlebars");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const homeRoute = require("./routes/home");
const addRoute = require("./routes/add");
const coursesRoute = require("./routes/courses");
const cardRoute = require("./routes/card");

const hbs = exphdbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/add", addRoute);
app.use("/", homeRoute);
app.use("/courses", coursesRoute);
app.use("/card", cardRoute);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        const url =
            "mongodb+srv://memet:12345@cluster0-mjl6h.mongodb.net/test?retryWrites=true&w=majority";
        await mongoose.connect(url, { useNewUrlParser: true });
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}.`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
