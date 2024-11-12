export function dateFormatterToDate(dateString: string): string {
  const date = new Date(dateString);
  const aryWeekDay = ["日", "月", "火", "水", "木", "金", "土"];
  const _year = date.getFullYear();
  const _month = date.getMonth() + 1;
  const _day = date.getDate();
  const _weekDay = date.getDay();

  return `${_year}年${_month}月${_day}日 (${aryWeekDay[_weekDay]})`;
}

export function getStartDate(targetDate:Date, targetRepeatType:number, targetRepeatDay:number = 0) {
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
        date.setMonth(setNextMonth);
      }
      date.setDate(targetRepeatDay)
      break;
    default:
      break;
  }
  // date.setHours(date.getHours() + 9);
  return date;
}