const db = require('../db/index');

const REPEAT_TYPE_TABLE = 'repeat_type';

module.exports = {
    REPEAT_TYPE_TABLE,

    async all() {
        const repeats = await db.select().table(REPEAT_TYPE_TABLE);
        return repeats;
    }
}