const { createShift, updateShiftEndTime, findUserShifts, findOngoingShift, findShiftById, updateShift } = require("../Repositories/shiftRepository");
const { getUserIdByCredentials } = require("./userService");
const moment = require('moment-timezone');

class ShiftService {
    static async getShiftById(shiftId)
    {
        const searchedShift = await findShiftById(shiftId);

        if(searchedShift == null)
            throw new Error("Nie udało się znaleźć zmiany o podanym Id");

        return searchedShift;
    }

    static async getAllUserShifts(userId)
    {
        const foundShifts = await findUserShifts(userId);

        console.log(foundShifts);

        if(foundShifts == null)
            return [];

        return foundShifts;
    }

    static async getUserShiftsOfTheDay(username, date)
    {
        const userId = await getUserIdByCredentials(username);
        const allShifts = await findUserShifts(userId);

        return allShifts.filter(shift => shift.date == date);
    }

    static async getHoursSumFormDay(username, date)
    {
        let totalMinutes = 0;
        const userId = await getUserIdByCredentials(username);
        const allShifts = await findUserShifts(userId);
        const filteredShifts = allShifts.filter(shift => shift.date == date && shift.endTime != null);

        filteredShifts.forEach(shift => {

            const start = moment(shift.startTime, "HH:mm");
            const end = moment(shift.endTime, "HH:mm");

            if (end.isBefore(start)) {
                end.add(1, 'days');
            }

            const duration = moment.duration(end.diff(start));
            const minutes = duration.asMinutes();

            totalMinutes += minutes;
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    static async startNewShift(userId, startTime)
    {
        const ongoingShift = await findOngoingShift(userId);
        if (!ongoingShift) {
            await createShift({ userId, date: new Date().toISOString().slice(0, 10), startTime });
        }
    }

    static async updateShiftEndTime(userId, endTime)
    {
        const ongoingShift = await findOngoingShift(userId);
        if (ongoingShift) {
            await updateShiftEndTime(ongoingShift.id, endTime);
        }
    }

    static async addNewShift(requestBody)
    {
        if (!requestBody.userId || !requestBody.startTime || !requestBody.endTime || !requestBody.date)
            {
                throw new Error("Brak wymaganych danych: userId, startTime, endTime lub date.");
            }

        const shiftData = {
            userId: requestBody.userId,
            date: requestBody.date,
            startTime: requestBody.startTime,
            endTime: requestBody.endTime
        }

        const createdShift = await createShift(shiftData);

        return createdShift;
    }

    static async updateShiftInfo(shiftId, requestBody) {
        try {
            const updatedData = {
                date: requestBody.date,
                startTime: moment.tz(requestBody.startTime, 'HH:mm', 'Europe/Warsaw').utc().format('HH:mm'),
                endTime: moment.tz(requestBody.endTime, 'HH:mm', 'Europe/Warsaw').utc().format('HH:mm')
            };

            const updatedShift = updateShift(shiftId, updatedData);

            if(!updatedShift)
                throw new Error("Nie znaleziono zmiany o zadanym id.");

        } catch (error) {
            console.error("Nie udało się zaktualizować zmiany", error);
            throw error;
        }
    }
}

module.exports = ShiftService;