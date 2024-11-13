const express = require("express");
const cors = require("cors");

const category_typeModel = require('./category_type/category_type.model');
const repeat_typeModel = require('./repeat_type/repeat_type.model');
const todo_typeModel = require('./todo_type/todo_type.model');
const todo_listModel = require('./todo_list/todo_list.model');

function setupServer() {
  const app = express();
  app.use(cors());
  
  app.use(express.json());
  app.use("/", express.static("./frontend/dist/"));
  
  app.get("/api/get/category_types", async (req, res) => {
    const category_types = await category_typeModel.all();
    res.status(200).json(category_types);
  });
  
  app.get("/api/get/repeat_types", async (req, res) => {
    const repeat_types = await repeat_typeModel.all();
    res.status(200).json(repeat_types);
  });
  
  app.get("/api/get/todo_types", async (req, res) => {
    const todo_types = await todo_typeModel.all();
    res.status(200).json(todo_types);
  });
  
  app.get("/api/get/todo_lists", async (req, res) => {
    const todo_lists = await todo_listModel.all();
    res.status(200).json(todo_lists);
  });
  
  app.post("/api/add/todo_type", async (req, res) => {
    const todo_type = req.body;
    const resultSave = await todo_typeModel.save(todo_type);
    res.status(200).json(resultSave);
  })
  
  app.post("/api/add/todo_list", async (req, res) => {
    const todo_list = req.body;
    const resultSave = await todo_listModel.save(todo_list);
    res.status(200).json(resultSave);
  })
  
  return app;
}

module.exports = {
  setupServer,
};
