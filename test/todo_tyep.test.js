const { expect } = require('chai');

const db = require('../src/db/index');
const todo_typeModel = require('../src/todo_type/todo_type.model');
const TODO_TYPE_TABLE = todo_typeModel.TODO_TYPE_TABLE;

describe('todo_type', () => {
    before(async () => {
        await db.migrate
            .forceFreeMigrationsLock()
            .then(() => db.migrate.rollback({ all: true }))
            .then(() => db.migrate.latest())
            .then(() => db.seed.run())
            .catch(console.error);
    });

    describe('save', () => {
        it('正常に記録できること', async () => {
            const addDateStart = new Date('2024-11-11T15:00:00.000Z');
            const addTargetTime = new Date('2022-02-22T21:00:00.000Z');
            const addTodoType = {
                title: 'test 4',
                repeat_type_id: 1,
                category_type_id: 1,
                use_time: true,
                date_start: addDateStart,
                target_weekday:3,
                target_day: 20,
                target_time: addTargetTime,
            };

            const resultId = await todo_typeModel.save(addTodoType);
            const resultTodoType = await todo_typeModel.find(resultId[0].id);

            expect(resultTodoType).to.exist;
            expect(resultTodoType).to.have.property('title');
            expect(resultTodoType).to.have.property('repeat_type_id');
            expect(resultTodoType).to.have.property('category_type_id');
            expect(resultTodoType).to.have.property('use_time');
            expect(resultTodoType).to.have.property('date_start');
            expect(resultTodoType).to.have.property('target_weekday');
            expect(resultTodoType).to.have.property('target_day');
            expect(resultTodoType).to.have.property('target_time');

            expect(resultTodoType.title).to.equal(addTodoType.title);
            expect(resultTodoType.repeat_type_id).to.equal(addTodoType.repeat_type_id);
            expect(resultTodoType.category_type_id).to.equal(addTodoType.category_type_id);
            expect(resultTodoType.use_time).to.equal(addTodoType.use_time);
            expect(resultTodoType.date_start.toDateString()).to.equal(addTodoType.date_start.toDateString());
            expect(resultTodoType.target_weekday).to.equal(addTodoType.target_weekday);
            expect(resultTodoType.target_day).to.equal(addTodoType.target_day);
            expect(resultTodoType.target_time.toDateString()).to.equal(addTodoType.target_time.toDateString());
        });
    });

    describe('update', () => {
        it('正常に更新できること', async () => {
            const updateDateStart = new Date('2024-10-13T20:00:00.000Z');
            const updateTargetTime = new Date('2023-02-23T21:00:00.000Z');
            const updateTodoType = [{
                title: 'update test',
                repeat_type_id: 3,
                category_type_id: 3,
                use_time: false,
                date_start: updateDateStart,
                target_weekday:3,
                target_day: 20,
                target_time: updateTargetTime,
            }];

            const resultId = await todo_typeModel.update(1, updateTodoType[0]);
            const resultTodoType = await todo_typeModel.find(resultId[0].id);

            expect(resultTodoType).to.exist;
            expect(resultTodoType).to.have.property('title');
            expect(resultTodoType).to.have.property('repeat_type_id');
            expect(resultTodoType).to.have.property('category_type_id');
            expect(resultTodoType).to.have.property('use_time');
            expect(resultTodoType).to.have.property('date_start');
            expect(resultTodoType).to.have.property('target_weekday');
            expect(resultTodoType).to.have.property('target_day');
            expect(resultTodoType).to.have.property('target_time');

            expect(resultTodoType.title).to.equal(updateTodoType[0].title);
            expect(resultTodoType.repeat_type_id).to.equal(updateTodoType[0].repeat_type_id);
            expect(resultTodoType.category_type_id).to.equal(updateTodoType[0].category_type_id);
            expect(resultTodoType.use_time).to.equal(updateTodoType[0].use_time);
            expect(resultTodoType.date_start.toDateString()).to.equal(updateTodoType[0].date_start.toDateString());
            expect(resultTodoType.target_weekday).to.equal(updateTodoType[0].target_weekday);
            expect(resultTodoType.target_day).to.equal(updateTodoType[0].target_day);
            expect(resultTodoType.target_time.toDateString()).to.equal(updateTodoType[0].target_time.toDateString());
        });
    });

    describe('delete', () => {
        it('正常に削除できること', async () => {
            const resultId = await todo_typeModel.delete(1);
            const resultTodoType = await todo_typeModel.find(resultId[0].id);

            expect(resultTodoType).to.be.undefined;
        });
    });

});
