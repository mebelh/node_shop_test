module.exports = function (req, res, next) {
    if (!req.session.isAuthentificated) {
        res.redirect("/auth/login");
    } else {
        next();
    }
};
