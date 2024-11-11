const { findUserShiftsForMonth } = require('../Repositories/shiftRepository');
const { getUserByUsername, getUserIdByCredentials } = require('../Services/userService');
const moment = require('moment');
const { Parser } = require("json2csv");
const FileType = require('../Miscellaneous/FileType');

class SalaryService {
    static async calculateMonthlySalary(username, selectedMonth) {
        const userId = await getUserIdByCredentials(username);
        const shifts = await findUserShiftsForMonth(userId, selectedMonth);
        
        let totalMinutes = 0;
    
        const filteredShifts = shifts.filter(
            shift => shift.endTime !== null
        );

        filteredShifts.forEach(shift => {
            if (shift.endTime) {
                const start = shift.startTime;
                const end = shift.endTime;
    
                const roundedHours = calculateRoundedHours(start, end);
                
                // Konwertuje zaokrąglone godziny na minuty
                totalMinutes += roundedHours * 60;
            }
        });
    
        // --- Zaokrąglanie godzin według schematu:
        //     - Pełna godzina: > 45 min.
        const hoursWorked = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
    
        const adjustedHours = hoursWorked + (minutes >= 45 ? 1 : 0);
    
        // Pobranie stawki użytkownika
        const user = await getUserByUsername(username);
        const salary = adjustedHours * user.hourlyPay;
    
        return { hoursWorked: adjustedHours, salary: salary };
    }


    static async generateMonthlyShiftReport(userId, month, fileType = FileType.JSON) {
        const monthlyShifts = await findUserShiftsForMonth(userId, month);

        const filteredShifts = monthlyShifts
            .filter(shift => shift.endTime !== null)
            .map(shift => ({
                date: shift.date,
                startTime: shift.startTime,
                endTime: shift.endTime,
                hoursWorked: calculateRoundedHours(shift.startTime, shift.endTime),
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        // Grupowanie zmian według dnia
        const shiftsByDay = filteredShifts.reduce((acc, shift) => {
            if (!acc[shift.date]) acc[shift.date] = [];
            acc[shift.date].push(shift);
            return acc;
        }, {});
    
        // Przygotowanie danych do raportu
        const reportData = [];
        let totalHours = 0;
    
        Object.entries(shiftsByDay).forEach(([date, shifts]) => {
            const firstShiftStart = shifts[0].startTime;
            const lastShiftEnd = shifts[shifts.length - 1].endTime;
            const dailyHours = shifts.reduce((sum, shift) => sum + shift.hoursWorked, 0);
            
            totalHours += dailyHours;
    
            reportData.push({
                data: date,
                godziny: dailyHours.toFixed(2),
                liczba_zmian: shifts.length,
                zakres_godzinowy: `${firstShiftStart} - ${lastShiftEnd}`,
            });
        });
    
        // Podsumowanie dla obu formatów
        reportData.push({
            data: "Łącznie",
            godziny: totalHours.toFixed(2),
            liczba_zmian: "",
            zakres_godzinowy: "",
        });
    
        switch (fileType) {
            case FileType.JSON:
                return JSON.stringify({
                    dni_miesiaca: reportData.slice(0, -1),
                    lacznie: totalHours.toFixed(2)
                }, null, 4);
            
            case FileType.CSV:
                const csvFields = ["data", "godziny", "liczba_zmian", "zakres_godzinowy"];
                const json2csvParser = new Parser({ fields: csvFields });
                return json2csvParser.parse(reportData);
    
            default:
                throw new Error("Wybrano nieprawidłowy format danych. Wybierz 'json' lub 'csv'.");
        }
    }
}

// --- Funkcja do wyliczania pełnych godzin, zaokrąglając minuty do pełnej godziny od 45 minut wzwyż
function calculateRoundedHours(startTime, endTime) {
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");

    if (end.isBefore(start)) {
        end.add(1, 'days');
    }

    const duration = moment.duration(end.diff(start));
    
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    // Zaokrąglanie do pełnej godziny tylko jeśli minut jest 45 lub więcej
    return minutes >= 45 ? hours + 1 : hours;
}

module.exports = SalaryService;