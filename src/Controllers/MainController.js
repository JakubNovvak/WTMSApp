const { getUserByUsername } = require("../Services/userService");

const path = "../Views/Pages";

exports.showHomePage = async (req, res) => {
    const user = await getUserByUsername(req.session.username);
    res.render(`${path}/index`, {username: user.name + " " + user.surname});
}

exports.showShiftPage = (req, res) => {
    res.render(`${path}/shiftStatus`);
}

exports.showHoursPage = (req, res) => {
    res.render(`${path}/hours`);
}

exports.showSalaryPage = (req, res) => {
    res.render(`${path}/calculateSalary`);
}

// "layout: false" blocks the shared layout elements
exports.showLoginPage = (req, res) => {
    res.render(`${path}/login`, { layout: false, errorMessage: null});
}