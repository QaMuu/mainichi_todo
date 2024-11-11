/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category_type').del()
  await knex('category_type').insert([
    {category_type_name: 'その他'},
    {category_type_name: '投薬'},
    {category_type_name: '買い物'},
    {category_type_name: 'ゴミ捨て'},
    {category_type_name: '会議'}
  ]);
};
