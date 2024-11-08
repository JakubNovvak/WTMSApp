const path = "../Views/Pages";

exports.login = (req, res) => {
    const {username, password } = req.body;
    
    if(username != "user1")
    {
        res.render(`${path}/login`, {layout: false, errorMessage: "Podano nieprawidłowy login lub hasło!"});
        return;
    }

    req.session.isLoggedIn = true;
    req.session.username = username;

    res.redirect("/");
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}
