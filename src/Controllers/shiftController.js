const { addNewShift, getAllUserShifts, getUserShiftsOfTheDay, getHoursSumFormDay, startNewShift, updateShiftEndTime } = require("../Services/shiftService");
const { getUserIdByCredentials } = require("../Services/userService");
const { changeToLocalTimeZone } = require('../Miscellaneous/changeToLocalTimeZone');
const path = "../Views/Pages";

// --- Endpoint od pośredniczący - przenosi dane z POST do widoku
exports.showUpdatedShiftsPage = async (req, res) => {
    try 
    {
        const selectedDate = req.body.selectedDate;
        const userShifts = await getUserShiftsOfTheDay(req.session.username, selectedDate);
        userShifts.forEach(shift => { changeToLocalTimeZone(shift) });

        const {hours, minutes } = await getHoursSumFormDay(req.session.username, selectedDate);

        res.render(`${path}/shifts`, { shifts: userShifts,  selectedDate: selectedDate, 
            errorMessage: userShifts.length == 0 ? "Brak zmian w wybranej dacie" : "", hours: hours, minutes: minutes
        });

    } catch (error) 
    {
        res.render(
            `${path}/shifts`, 
            { shifts: [], selectedDate: "", errorMessage: "Wystąpił błąd przy próbie pobrania zmian.", hours: 0,minutes: 0
        });
    }
}

// --- Dodanie pełnej zmiany dla użytkownika
exports.addNewShift = async (req, res) => {
    try 
    {
        const addedShift = await addNewShift(req.body);
        res.status(200).json({message: "Pomyślnie dodano nową zmianę", shift: addedShift});

    } catch (error) 
    {
        res.status(500).json({message: "Wystąpił błąd z dodaniem zmiany", shift: null});
    }
}

// --- Endpoint od ropoczęcia nowej zmiany
exports.startCurrentShift = async (req, res) => {

    const startTime = new Date().toISOString().slice(11, 16);

    try 
    {
        const userId = await getUserIdByCredentials(req.session.username);

        await startNewShift(userId, startTime);

        res.status(200).redirect("/manage-shift");
    } catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: "Błąd podczas próby rozpoczęcia zmiany." });
    }
}

// --- Endpoint od zakończenia nowej zmiany
exports.endCurrentShift = async (req, res) => {

    const endTime = new Date().toISOString().slice(11, 16);

    try 
    {
        const userId = await getUserIdByCredentials(req.session.username);

        await updateShiftEndTime(userId, endTime);

        res.status(200).redirect("/manage-shift");
    } catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: "Błąd podczas próby zakończenia zmiany." });
    }
}


// ------------------------------ Pozostałe endpointy ------------------------------

// --- Endpoint od pobrania wszystkich zmian użytkownika
exports.getAllUserShifts = async (req, res) => {
    try 
    {
        const shifts = await getAllUserShifts(req.params.userId);
        res.status(200).json({message: "Pomyślnie zaciągnięto zmiany użytkownika", shifts: shifts});

    } catch (error) 
    {
        res.status(400).json({message: "Wsytąpił problem podczas pobierania listy zmian", shifts: []});
    }
}

// --- Endpoint od pobrania wszystkich zmian zalogowanego użytkownika
exports.getLoggedInDateShifts = async (req, res) => {
    try 
    {
        const userShifts = await getUserShiftsOfTheDay(req.session.username, req.params.shiftsDate);
        
        res.status(200).json({message: "Pomyślnie wczytano zmiany z bazy.", shifts: userShifts});

    } catch (error) 
    {
        res.status(500).json({message: "Wystąpił błąd z wczytaniem danych z bazy.", shift: null});
    }
}