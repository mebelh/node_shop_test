const express = require("express");
const path = require("path");
const csrf = require("csurf");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const homeRoute = require("./routes/home");
const addRoute = require("./routes/add");
const coursesRoute = require("./routes/courses");
const cardRoute = require("./routes/card");
const ordersRoute = require("./routes/orders");
const authRoute = require("./routes/auth");

const MONGODB_URI = "mongodb+srv://memet:12345@cluster0-mjl6h.mongodb.net/shop";

const User = require("./models/user");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");

const app = express();

const exphbs = require("express-handlebars");

const Handlebars = require("handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const store = new MongoStore({
    collection: "sessions",
    uri: MONGODB_URI,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "some secret value",
        resave: false,
        saveUninitialized: false,
        store,
    })
);
app.use(csrf());

app.use(varMiddleware);
app.use(userMiddleware);

app.use("/add", addRoute);
app.use("/", homeRoute);
app.use("/courses", coursesRoute);
app.use("/card", cardRoute);
app.use("/orders", ordersRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
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
