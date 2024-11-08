const path = "../Views/Pages";

exports.showHomePage = (req, res) => {
    res.render(`${path}/index`);
}

exports.showShiftPage = (req, res) => {
    res.render(`${path}/shiftStatus`)
}

exports.showHoursPage = (req, res) => {
    res.render(`${path}/hours`)
}

exports.showSalaryPage = (req, res) => {
    res.render(`${path}/calculateSalary`)
}