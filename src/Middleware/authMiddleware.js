module.exports.isLoggedIn = (req, res, next) => {
    if(req.session.isLoggedIn)
        return next();

    res.redirect('/login');
}

// module.exports.isAdminUser = (req, res, next) => {
//     if(req.session.username == "admin")
//         return next();

//     res.redirect('/login');
// }