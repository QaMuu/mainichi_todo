module.exports = function getStartDate(targetDate, targetRepeatType, targetRepeatDay = 0) {
    const date = targetDate;
    switch (targetRepeatType) {
        case 1:
            date.setDate(date.getDate() + 1);
            break;
        case 2:
            date.setDate(date.getDate() + 7);
            break;
        case 3:
            date.setDate(date.getDate() + 14);
            break;
        case 4:
            date.setDate(date.getDate() + 21);
            break;
        case 5:
            let setNextMonth = date.getMonth() + 1;
            if (setNextMonth > 12) {
                date.setFullYear(date.getFullYear() + 1);
                date.setMonth(setNextMonth - 12);
            } else {
                console.log(setNextMonth)
                date.setMonth(setNextMonth);
            }
            date.setDate(targetRepeatDay)
            break;
        default:
            break;
    }
    date.setHours(date.getHours() + 9);
    return date;
}