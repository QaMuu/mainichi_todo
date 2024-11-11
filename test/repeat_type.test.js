const { expect } = require('chai');

const db = require('../src/db/index');
const repeat_typeModel = require('../src/repeat_type/repeat_type.model');
const REPEAT_TYPE_TABLE = repeat_typeModel.REPEAT_TYPE_TABLE;

describe('repeat_type', () => {
    before(async () => {
        await db.migrate
            .forceFreeMigrationsLock()
            .then(() => db.migrate.rollback({ all: true }))
            .then(() => db.migrate.latest())
            .then(() => db.seed.run())
            .catch(console.error);
    });

    describe('all', () => {
        it('リピートタイプの配列が返却されていること', async () => {
            const repeats = await repeat_typeModel.all();
            expect(repeats).to.be.an.instanceof(Array);
        });

        it('特定のプロパティを持っていること', async () => {
            const repeats = await repeat_typeModel.all();
            repeats.forEach((repeat) => {
                expect(repeat).to.exist;
                expect(repeat).to.have.property('id');
                expect(repeat).to.have.property('repeat_type_name');
            });
        });

        it('シードとして投入した5件のレコードを持つこと', async () => {
            const repeats = await repeat_typeModel.all();
            expect(repeats.length).to.be.at.most(5);
        });
    });
});
