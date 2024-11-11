const db = require('../db/index');

const TODO_LIST_TABLE = 'todo_list';

module.exports = {
    TODO_LIST_TABLE,

    async all() {
        const todo_lists = await db.select().table(TODO_LIST_TABLE);
        return todo_lists;
    },

    async find(id) {
        const todo_list = await db(TODO_LIST_TABLE).where({ id }).first();
        return todo_list;
    },

    async save(todo_list) {
        const resultId = await db(TODO_LIST_TABLE).insert(todo_list,['id']);
        return resultId;
    },

    async update(id, todo_list) {
        const resultId = await db(TODO_LIST_TABLE).where({id}).update(todo_list,['id']);
        return resultId;
    },

    async delete(id) {
        const resultId = await db(TODO_LIST_TABLE).where({id}).delete(['id']);
        return resultId;
    }
}