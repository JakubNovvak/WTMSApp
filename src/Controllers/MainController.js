const { getUserByUsername, getUserIdByCredentials } = require("../Services/userService");
const { getHoursSumFormDay, getUserShiftsOfTheDay, getAllUserShifts } = require("../Services/shiftService");
const { changeToLocalTimeZone } = require('../Miscellaneous/changeToLocalTimeZone');
const moment = require('moment-timezone');
const path = "../Views/Pages";

// --- Widok Strony Głównej
exports.showHomePage = async (req, res) => {
    const user = await getUserByUsername(req.session.username);
    res.render(`${path}/index`, {username: user.name + " " + user.surname});
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

// --- Widok Strony Zarządzania Zmianą
exports.showShiftPage = async (req, res) => {
    let errorMessage = "";
    const today = new Date().toISOString().slice(0, 10);
    try 
    {   
        // --- Sprawdzenie, czy nie ma starszej zmiany, która nie została zakończona
        const userId = await getUserIdByCredentials(req.session.username);
        const allShifts = await getAllUserShifts(userId);

        const incompleteShift = allShifts.find(shift => 
            shift.endTime === null && moment(shift.date).isBefore(today)
        );

        console.log("> ", incompleteShift);

        if(incompleteShift)
            errorMessage = `Jedna ze zmian nie została prawidłowo zakończona (${incompleteShift.date})\nSkontaktuj się z Administratorem.`;

        // --- Znalezenie obecnie trwającej zmiany z dzisiejszego dnia
        const shifts = await getUserShiftsOfTheDay(req.session.username, today);
        shifts.forEach(shift => { changeToLocalTimeZone(shift)});

        const {hours, minutes} = await getHoursSumFormDay(req.session.username, today);
        const ongoingShift = shifts.find(shift => shift.endTime === null);


        res.render(`${path}/shiftStatus`, { shifts, hours, minutes, ongoingShift, errorMessage });

    } catch (error)
    {   
        console.log(error);
        res.status(500).json({ message: "Błąd podczas ładowania strony zarządzania zmianami.", error: error});
    }
}