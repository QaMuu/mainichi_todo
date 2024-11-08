exports.up = async (knex) => {
    await knex.schema.createTable("todo_list", (table) => {
        table.increments("id").primary();
        table.integer('todo_type_id').notNullable();
        table.datetime('todo_date');
        table.boolean('check_done')
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable("todo_list");
};

