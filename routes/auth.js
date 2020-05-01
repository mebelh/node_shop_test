const { Router } = require("express");

const bcrybt = require("bcryptjs");

const router = Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
        loginError: req.flash("loginError"),
        registerError: req.flash("registerError"),
        registerOk: req.flash("registerOk"),
    });
});
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login#login");
    });
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            const areSame = await bcrybt.compare(password, candidate.password);

            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthentificated = true;
                req.session.save((err) => {
                    if (err) {
                        throw new Error(err);
                    } else {
                        res.redirect("/");
                    }
                });
            } else {
                req.flash("loginError", "Неверный пароль!");

                res.redirect("/auth/login#login");
            }
        } else {
            req.flash("loginError", "Такого пользователя не существует!");

            res.redirect("/auth/login#login");
        }
    } catch (e) {
        console.log(e);
    }
});

router.post("/register", async (req, res) => {
    try {
        const { email, password, repeat, name } = req.body;

        const candidate = await User.findOne({ email });
        if (candidate) {
            req.flash(
                "registerError",
                " Аккаунт с таким email уже существует!"
            );
            res.redirect("/auth/login#register");
        } else if (password !== repeat) {
            console.log(password + "  ||| " + repeat);

            req.flash("registerError", "Пароли не совпадают!");
            res.redirect("/auth/login#register");
        } else {
            const hashPassword = await bcrybt.hash(password, 10);
            const user = new User({
                email,
                name,
                password: hashPassword,
                cart: { items: [] },
            });
            req.flash(
                "registerOk",
                "Регистрация прошла успешно, войдите в учетную запись."
            );
            await user.save();

            res.redirect("/auth/login");
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
