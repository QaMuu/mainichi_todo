const { expect } = require('chai');

const db = require('../src/db/index');
const category_typeModel = require('../src/category_type/category_type.model');
const CATEGORY_TYPE_TABLE = category_typeModel.CATEGORY_TYPE_TABLE;

describe('customer', () => {
    before(async () => {
        await db.migrate
            .forceFreeMigrationsLock()
            .then(() => db.migrate.rollback({ all: true }))
            .then(() => db.migrate.latest())
            .then(() => db.seed.run())
            .catch(console.error);
    });

    describe('all', () => {
        it('カテゴリーの配列が返却されていること', async () => {
            const categories = await category_typeModel.all();
            expect(categories).to.be.an.instanceof(Array);
        });

        it('特定のプロパティを持っていること', async () => {
            const categories = await category_typeModel.all();
            categories.forEach((category) => {
                expect(category).to.exist;
                expect(category).to.have.property('id');
                expect(category).to.have.property('category_type_name');
            });
        });

        it('シードとして投入した5件のレコードを持つこと', async () => {
            const categories = await category_typeModel.all();
            expect(categories.length).to.be.at.most(5);
        });
    });
});
