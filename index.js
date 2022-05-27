const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Task = require("./model");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

//  Get Task
app.get("/api/task", (req, res) => {
  Task.find({}).then((task) => {
    res.json(task);
  });
});

// Post Task
app.post("/api/task", (req, res) => {
  const { task, taskId, complete } = req.body;
  if (!task || !taskId || complete === undefined) {
    res.send("error");
    return;
  }
  const newTask = new Task({
    task,
    taskId,
    complete,
  });
  newTask.save().then((newTask) => {
    res.json(newTask);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
