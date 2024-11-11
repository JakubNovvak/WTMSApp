const { calculateMonthlySalary, generateMonthlyShiftReport } = require('../Services/salaryService');
const { getUserIdByCredentials } = require('../Services/userService');
const path = "../Views/Pages";
const MonthsMap = require('../Miscellaneous/MonthsMap');
const FileType = require('../Miscellaneous/FileType');

exports.showSalaryCalculatorPage = (req, res) => 
{
    try {
        res.render(`${path}/calculateSalary`, { selectedMonth: null, summary: null, monthFullName: null });
    } catch (error) 
    {
        res.status(500).json({ message: "Błąd podczas otwierania strony z kalkulatorem wynagrodzenia." });
    }
};

exports.calculateSalary = async (req, res) => {
    const selectedMonth = req.params.selectedMonth;

    try {
        const summary = await calculateMonthlySalary(req.session.username, selectedMonth);
        res.render(`${path}/calculateSalary`, { selectedMonth, summary, monthFullName: MonthsMap[selectedMonth.slice(-2)] });

    } catch (error) 
    {
        res.status(500).json({ message: "Błąd podczas obliczania wynagrodzenia." });
    }
};

exports.downloadMonthlyShiftCsv = async (req, res) => {
    try {
        const userId = req.params.userId;
        const month = req.params.month;
        const csvData = await generateMonthlyShiftReport(userId, month, FileType.CSV);

        res.header("Content-Type", "text/csv");
        res.attachment(`raport_${MonthsMap[month.slice(-2)].toLowerCase()}_${month.slice(0, 4)}.csv`);
        return res.send(csvData);
    } catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: "Błąd podczas generowania CSV" });
    }
};

exports.downloadMonthlyShiftJson = async (req, res) => {
    try {
        const userId = req.params.userId;
        const month = req.params.month; 
        const jsonData = await generateMonthlyShiftReport(userId, month, FileType.JSON);

        res.header("Content-Type", "application/json");
        res.attachment(`raport_${MonthsMap[month.slice(-2)].toLowerCase()}_${month.slice(0, 4)}.json`);
        
        return res.send(jsonData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Błąd podczas generowania raportu JSON" });
    }
};