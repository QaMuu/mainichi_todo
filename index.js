const express = require("express");
const db = require("./src/db");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use("/", express.static(__dirname + "/public"));

app.listen(PORT, () => {
    console.log(`Is your server running? Well, you better go catch it, then! http://localhost:${PORT}`);
});
