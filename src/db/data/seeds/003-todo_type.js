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
  const id_2_DateStart = getStartDate(new Date(), 2);
  const id_3_DateStart = getStartDate(new Date(), 3);
  const id_4_DateStart = getStartDate(new Date(), 4);
  const id_5_DateStart = getStartDate(new Date(), 5,20);

  const targetWeekDay = new Date().getDate();

  // Deletes ALL existing entries
  await knex('todo_type').del()
  await knex('todo_type').insert([
    {
      id: 1,
      title: '毎日：その他',
      repeat_type_id: 1,
      category_type_id: 1,
      use_time: true,
      date_start: id_1_DateStart,
      target_weekday:targetWeekDay,
      target_day: 20,
      target_time: id_1_DateStart,
    },
    {
      id: 2,
      title: '毎週：投薬',
      repeat_type_id: 2,
      category_type_id: 2,
      use_time: true,
      date_start: id_2_DateStart,
      target_weekday:targetWeekDay,
      target_day: 20,
      target_time: id_2_DateStart,
    },
    {
      id: 3,
      title: '隔週：買い物',
      repeat_type_id: 3,
      category_type_id: 3,
      use_time: true,
      date_start: id_3_DateStart,
      target_weekday:targetWeekDay,
      target_day: 20,
      target_time: id_3_DateStart,
    },
    {
      id: 4,
      title: '3週間後：ゴミ捨て',
      repeat_type_id: 4,
      category_type_id: 4,
      use_time: true,
      date_start: id_4_DateStart,
      target_weekday:targetWeekDay,
      target_day: 20,
      target_time: id_4_DateStart,
    },
    {
      id: 5,
      title: '毎月：会議',
      repeat_type_id: 5,
      category_type_id: 5,
      use_time: true,
      date_start: id_5_DateStart,
      target_weekday:targetWeekDay,
      target_day: 20,
      target_time: id_5_DateStart,
    },
  ]);
};
