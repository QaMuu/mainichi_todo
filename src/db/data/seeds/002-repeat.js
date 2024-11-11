/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('repeat_type').del()
  await knex('repeat_type').insert([
    {repeat_type_name: '毎日'},
    {repeat_type_name: '毎週'},
    {repeat_type_name: '隔週'},
    {repeat_type_name: '3週間おき'},
    {repeat_type_name: '毎月'}
  ]);
};
