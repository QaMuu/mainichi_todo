const db = require('../src/db/index');

exports.mochaGlobalTeardown = async () => {
    try {
        await db.destroy();
        console.log('✅ Closed database connection');
    } catch (error) {
        console.error(error);
    }
};
