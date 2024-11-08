/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable("todo_type", (table) => {
        table.string('title',64).notNullable();
        table.integer('repeat_type_id').notNullable();
        table.integer('category_type_id').notNullable();
        table.boolean('use_time').notNullable();
        table.date('date_start');
        table.integer('target_weekday');
        table.integer('target_day');
        table.date('target_time');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable("todo_type");
};
