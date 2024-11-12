const express = require("express");
const cors = require("cors");

const category_typeModel = require('./category_type/category_type.model');

function setupServer() {
  const app = express();
  app.use(cors());
  
  app.use(express.json());
  app.use("/", express.static("./frontend/dist/"));
  
  app.get("/api/get/category_types", async (req, res) => {
    const category_type = await category_typeModel.all();
    res.status(200).json(category_type);
  });
  
  return app;
}

module.exports = {
  setupServer,
};
