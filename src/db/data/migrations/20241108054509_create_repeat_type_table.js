exports.up = async (knex) => {
    await knex.schema.createTable("repeat_type", (table) => {
        table.increments("id").primary();
        table.string("repeat_type_name", 64).notNullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable("repeat_type");
};

