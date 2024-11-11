module.exports.isLoggedIn = (req, res, next) => {
    if(req.session.username === "Admin")
        {
            res.redirect('/admin');
            return;
        }

    if(req.session.isLoggedIn)
        return next();

    res.redirect('/login');
}

module.exports.isAdmin = (req, res, next) => {
    if (req.session.username === "Admin") {
        return next();
    }

    res.redirect('/');
};