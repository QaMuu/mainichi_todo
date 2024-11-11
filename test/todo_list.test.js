const { expect } = require('chai');

const db = require('../src/db/index');
const todo_listModel = require('../src/todo_list/todo_list.model');

describe('todo_list', () => {
    before(async () => {
        await db.migrate
            .forceFreeMigrationsLock()
            .then(() => db.migrate.rollback({ all: true }))
            .then(() => db.migrate.latest())
            .then(() => db.seed.run())
            .catch(console.error);
    });

    describe('all', () => {
        it('todo_listの配列が返却されていること', async () => {
            const todo_lists = await todo_listModel.all();
            expect(todo_lists).to.be.an.instanceof(Array);
        });

        it('特定のプロパティを持っていること', async () => {
            const todo_lists = await todo_listModel.all();
            todo_lists.forEach((todo_list) => {
                expect(todo_list).to.exist;
                expect(todo_list).to.have.property('todo_type_id');
                expect(todo_list).to.have.property('todo_date');
                expect(todo_list).to.have.property('check_done');
            });
        });

        it('シードとして投入した5件のレコードを持つこと', async () => {
            const todo_lists = await todo_listModel.all();
            expect(todo_lists.length).to.be.at.most(5);
        });
    });

    describe('save', () => {
        it('正常に記録できること', async () => {
            const addTodoDate = new Date('2024-11-11T15:00:00.000Z');
            const addTodoList = {
                id: 6,
                todo_type_id: 1,
                todo_date: addTodoDate,
                check_done: false
            };

            const resultId = await todo_listModel.save(addTodoList);
            const resultTodoList = await todo_listModel.find(resultId[0].id);

            expect(resultTodoList).to.exist;
            expect(resultTodoList).to.have.property('todo_type_id');
            expect(resultTodoList).to.have.property('todo_date');
            expect(resultTodoList).to.have.property('check_done');

            expect(resultTodoList.todo_type_id).to.equal(addTodoList.todo_type_id);
            expect(resultTodoList.todo_date.toDateString()).to.equal(addTodoList.todo_date.toDateString());
            expect(resultTodoList.check_done).to.equal(addTodoList.check_done);
        });
    });

    describe('update', () => {
        it('正常に更新できること', async () => {
            const updateTodoDate = new Date('2024-11-11T15:00:00.000Z');
            const updateTodoList = {
                id: 6,
                todo_type_id: 2,
                todo_date: updateTodoDate,
                check_done: true
            };

            const resultId = await todo_listModel.update(6, updateTodoList);
            const resultTodoList = await todo_listModel.find(resultId[0].id);

            expect(resultTodoList).to.exist;
            expect(resultTodoList).to.have.property('todo_type_id');
            expect(resultTodoList).to.have.property('todo_date');
            expect(resultTodoList).to.have.property('check_done');

            expect(resultTodoList.todo_type_id).to.equal(updateTodoList.todo_type_id);
            expect(resultTodoList.todo_date.toDateString()).to.equal(updateTodoList.todo_date.toDateString());
            expect(resultTodoList.check_done).to.equal(updateTodoList.check_done);
        });
    });

    describe('delete', () => {
        it('正常に削除できること', async () => {
            const resultId = await todo_listModel.delete(6);
            const resultTodoList = await todo_listModel.find(resultId[0].id);

            expect(resultTodoList).to.be.undefined;
        });
    });

});
