/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function getStartDate(targetDate, targetRepeatType, targetRepeatDay = 0) {
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

exports.seed = async function(knex) {
  const id_1_DateStart = getStartDate(new Date(), 1);
  // id_1_DateStart.setHours(15, 0, 0, 0);
  const id_2_DateStart = getStartDate(new Date(), 2);
  // id_2_DateStart.setHours(16, 0, 0, 0);
  const id_3_DateStart = getStartDate(new Date(), 3);
  // id_3_DateStart.setHours(17, 0, 0, 0);
  const id_4_DateStart = getStartDate(new Date(), 4);
  // id_4_DateStart.setHours(18, 0, 0, 0);
  const id_5_DateStart = getStartDate(new Date(), 5,20);
  // id_5_DateStart.setHours(19, 0, 0, 0);

  // Deletes ALL existing entries
  await knex('todo_list').del()
  await knex('todo_list').insert([
    {id: 1, todo_type_id: 1, todo_date: id_1_DateStart, check_done: false},
    {id: 2, todo_type_id: 2, todo_date: id_2_DateStart, check_done: false},
    {id: 3, todo_type_id: 3, todo_date: id_3_DateStart, check_done: false},
    {id: 4, todo_type_id: 4, todo_date: id_4_DateStart, check_done: false},
    {id: 5, todo_type_id: 5, todo_date: id_5_DateStart, check_done: false},
  ]);
};
