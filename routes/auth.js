const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
    });
});
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login#login");
    });
});

router.post("/login", async (req, res) => {
    const user = await User.findById("5ea9dd18fda86c3ad0738182");
    req.session.user = user;
    req.session.isAuthentificated = true;
    req.session.save((err) => {
        if (err) {
            throw new Error(err);
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;
