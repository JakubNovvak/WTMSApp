const Shift = require('../Models/shiftModel');
const moment = require('moment');

class ShiftRepository 
{
    static async findUserShifts(userId)
    {
        return await Shift.findAll({where: {userId: userId}});
    }

    static async findShiftById(shiftId)
    {
        return await Shift.findByPk(shiftId);
    }

    static async findUserShiftsForToday(userId, date)
    {
        return await Shift.findAll({ where: { userId, date } });
    }

    static async findOngoingShifts(userId) 
    {
        return await Shift.findAll({ where: { userId, endTime: null } });
    }

    static async findOngoingShiftToday(userId, today) 
    {
        return await Shift.findOne({ where: { userId, endTime: null, date: today} });
    }

    static async updateShiftEndTime(shiftId, endTime) 
    {
        return await Shift.update({ endTime }, { where: { id: shiftId } });
    }

    static async createShift(shiftData)
    {
        return await Shift.create(shiftData);
    }

    static async findUserShiftsForMonth(userId, selectedMonth) 
    {
        const shifts = await Shift.findAll({ where: { userId } });

        const startOfMonth = moment(selectedMonth, "YYYY-MM").startOf('month').toDate();
        const endOfMonth = moment(selectedMonth, "YYYY-MM").endOf('month').toDate();

        const filteredShifts = shifts.filter(shift => {
            const shiftDate = moment(shift.date);
            return shiftDate.isBetween(startOfMonth, endOfMonth, 'day', '[]');
        });

        return filteredShifts;
    }

    static async updateShift(shiftId, updatedData)
    {
        const updatedShift = await Shift.findByPk(shiftId);
        await updatedShift.update(updatedData);
        return updatedShift;
    }
}

module.exports = ShiftRepository;