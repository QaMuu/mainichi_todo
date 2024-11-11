const db = require('../db/index');

const CATEGORY_TYPE_TABLE = 'category_type';

module.exports = {
    CATEGORY_TYPE_TABLE,

    async all() {
        const categories = await db.select().table(CATEGORY_TYPE_TABLE);
        return categories;
    }
}