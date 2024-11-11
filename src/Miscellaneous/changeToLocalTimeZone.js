const moment = require('moment-timezone');

function changeToLocalTimeZone(shift) 
{
    shift.startTime = moment.utc(shift.startTime, 'HH:mm').tz('Europe/Warsaw').format('HH:mm');
    if(shift.endTime)
        shift.endTime = moment.utc(shift.endTime, 'HH:mm').tz('Europe/Warsaw').format('HH:mm');
}

exports.changeToLocalTimeZone = changeToLocalTimeZone;