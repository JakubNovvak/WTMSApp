const { getUserByUsername } = require("../Services/userService");
const { getHoursSumFormDay, getUserShiftsOfTheDay } = require("../Services/shiftService");
const { changeToLocalTimeZone } = require('../Miscellaneous/changeToLocalTimeZone');
const path = "../Views/Pages";

// --- Widok Strony Głównej
exports.showHomePage = async (req, res) => {
    const user = await getUserByUsername(req.session.username);
    res.render(`${path}/index`, {username: user.name + " " + user.surname});
}

// --- Widok Strony Zarządzania Zmianą
exports.showShiftPage = async (req, res) => {
    try 
    {   
        const today = new Date().toISOString().slice(0, 10);
        const shifts = await getUserShiftsOfTheDay(req.session.username, today);
        shifts.forEach(shift => { changeToLocalTimeZone(shift)});

        const {hours, minutes} = await getHoursSumFormDay(req.session.username, today);
        const ongoingShift = shifts.find(shift => shift.endTime === null);
        //changeToLocalTimeZone(ongoingShift);

        res.render(`${path}/shiftStatus`, { shifts, hours, minutes, ongoingShift, today });

    } catch (error) 
    {   
        console.log(error);
        res.status(500).json({ message: "Błąd podczas ładowania strony zarządzania zmianami.", error: error});
    }
}

// --- Widok Strony z godzinami
exports.showHoursPage = (req, res) => {
    try 
    {
        res.render(`${path}/shifts`, {shifts: [], selectedDate: "", errorMessage: "", hours: 0, minutes: 0});    
    } catch (error) 
    {
        res.status(500).json({ message: "Nie udało się załadować strony z godzinami." });    
    }
}

// --- Widok strony logowania
// --- "layout: false" blokuje wyświetlanie się navbara
exports.showLoginPage = (req, res) => {
    try 
    {
        res.render(`${path}/login`, { layout: false, errorMessage: null});    
    } catch (error) 
    {
        res.status(500).json( {message: "Nie udało się załadować strony logowania."} );    
    }
}