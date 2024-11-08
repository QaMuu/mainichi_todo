exports.up = async (knex) => {
    await knex.schema.createTable("category_type", (table) => {
        table.increments("id").primary();
        table.string("category_type_name", 64).notNullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable("category_type");
};

