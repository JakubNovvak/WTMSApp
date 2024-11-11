const path = "../Views/Pages";
const { checkUserCredentials } = require("../Services/userService");

// --- Endpoint obsługujący logowanie
exports.login = async (req, res) => {

    const {username, password } = req.body;
    const isValidUser = await checkUserCredentials(username, password);

    if(!isValidUser)
    {
        res.render(`${path}/login`, {layout: false, errorMessage: "Podano nieprawidłowy login lub hasło!"});
        return;
    }

    req.session.isLoggedIn = true;
    req.session.username = username;

    if(username === "Admin")
    {
        res.redirect("/admin/");
        return;
    }

    res.redirect("/");
}

// --- Endpoint obsługujący wylogowanie
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}