const db = require('../db/index');

const TODO_TYPE_TABLE = 'todo_type';

module.exports = {
    TODO_TYPE_TABLE,

    async all() {
        const todo_types = await db.select().table(TODO_TYPE_TABLE);
        return todo_types;
    },

    async find(id) {
        const todo_type = await db(TODO_TYPE_TABLE).where({ id }).first();
        return todo_type;
    },

    async save(todo_type) {
        const resultId = await db(TODO_TYPE_TABLE).insert(todo_type,['id']);
        return resultId;
    },

    async update(id, todo_type) {
        const resultId = await db(TODO_TYPE_TABLE).where({id}).update(todo_type,['id']);
        return resultId;
    },

    async delete(id) {
        const resultId = await db(TODO_TYPE_TABLE).where({id}).delete(['id']);
        return resultId;
    }
}