const { Router } = require("express");
const router = Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
    res.render("orders", {
        isOrder: true,
        title: "Заказы",
    });
});

router.post("/", async (req, res) => {
    try {
        const user = await req.user
            .populate("cart.items.courseId")
            .execPopulate();

        const courses = user.cart.items.map((c) => {
            return {
                count: c.count,
                course: { ...c.courseId._doc },
            };
        });

        const order = new Order({
            user: { name: req.user.name, userId: req.user },
            courses: courses,
        });

        await order.save();

        await req.user.clearCart();

        res.redirect("/orders");
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
