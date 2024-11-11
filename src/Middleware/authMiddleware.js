// --- Middleware sprawdzające, czy użytkownik jest zalogowany
//     (wymuszenie przejścia na strony dla admina, jeżeli admin)

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

// --- Middleware blokujące dalszy dostep, dla użytkowników
//     niebędących adminem
module.exports.isAdmin = (req, res, next) => {
    if (req.session.username === "Admin") {
        return next();
    }

    res.redirect('/');
};