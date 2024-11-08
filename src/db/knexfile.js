require("dotenv").config();

module.exports = {
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.POSTGRES_PORT || 5432,
        user: process.env.POSTGRES_USER || "",
        database: process.env.POSTGRES_DB || "mainichi_todo",
        password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
        directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
};
