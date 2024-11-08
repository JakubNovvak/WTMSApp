const path = "../Views/Pages";

exports.showHomePage = (req, res) => {
    res.render(`${path}/index`, {username: req.session.username});
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