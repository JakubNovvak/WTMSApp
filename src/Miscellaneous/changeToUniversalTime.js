const moment = require('moment-timezone');

function changeToUniversalTime(shift) 
{
    shift.startTime = moment.utc(shift.startTime, 'HH:mm').format('HH:mm');
    if(shift.endTime)
        shift.endTime = moment.utc(shift.endTime, 'HH:mm').format('HH:mm');
}

exports.changeToUniversalTime = changeToUniversalTime;