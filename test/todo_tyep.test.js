const { expect } = require('chai');

const db = require('../src/db/index');
const todo_typeModel = require('../src/todo_type/todo_type.model');

describe('todo_type', () => {
    before(async () => {
        await db.migrate
            .forceFreeMigrationsLock()
            .then(() => db.migrate.rollback({ all: true }))
            .then(() => db.migrate.latest())
            .then(() => db.seed.run())
            .catch(console.error);
    });

    describe('all', () => {
        it('todo_typeの配列が返却されていること', async () => {
            const todo_types = await todo_typeModel.all();
            expect(todo_types).to.be.an.instanceof(Array);
        });

        it('特定のプロパティを持っていること', async () => {
            const todo_types = await todo_typeModel.all();
            todo_types.forEach((todo_type) => {
                expect(todo_type).to.exist;
                expect(todo_type).to.have.property('title');
                expect(todo_type).to.have.property('repeat_type_id');
                expect(todo_type).to.have.property('category_type_id');
                expect(todo_type).to.have.property('use_time');
                expect(todo_type).to.have.property('date_start');
                expect(todo_type).to.have.property('target_weekday');
                expect(todo_type).to.have.property('target_day');
                expect(todo_type).to.have.property('target_time');
            });
        });

        it('シードとして投入した5件のレコードを持つこと', async () => {
            const todo_types = await todo_typeModel.all();
            expect(todo_types.length).to.be.at.most(5);
        });
    });

    describe('save', () => {
        it('正常に記録できること', async () => {
            const addDateStart = new Date('2024-11-11T15:00:00.000Z');
            const addTargetTime = new Date('2022-02-22T21:00:00.000Z');
            const addTodoType = {
                id: 6,
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

            const resultId = await todo_typeModel.update(6, updateTodoType[0]);
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
            const resultId = await todo_typeModel.delete(6);
            const resultTodoType = await todo_typeModel.find(resultId[0].id);

            expect(resultTodoType).to.be.undefined;
        });
    });

});
