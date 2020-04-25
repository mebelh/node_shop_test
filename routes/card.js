const { Router } = require("express");
const Course = require("../models/course");
const Card = require("../models/card");
const router = Router();

router.get("/", async (req, res) => {
    const card = await Card.fetch();
    res.render("../views/card.hbs", {
        title: "Корзина",
        isCard: true,
        courses: card.courses,
        price: card.price,
    });
});

router.delete("/remove/:id", async (req, res) => {
    const card = await Card.remove(req.params.id);
    res.status(200).json(card);
});

router.post("/add", async (req, res) => {
    const course = await Course.getById(req.body.id);

    await Card.add(course);
    res.redirect("/card");
});

module.exports = router;
