const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const Task = require('./model');


mongoose.connect("mongodb+srv://deposittracker:<>@clusterdummy.z7sma.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connected!"))
    .catch(err => console.error("DB connection error:", err));


app.use(cors());
app.use(express.json())


app.post("/addTask", async (req, res) => {
    const { todo } = req.body;
    try {
        const newTask = new Task({ todo });
        await newTask.save();
        return res.json(newTask); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding task");
    }
});



app.delete('/taskDelete/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id); 
        const tasks = await Task.find(); 
        return res.json(tasks); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting task");
    }
});


app.get("/getTask", async (req, res) => {
    try {
        const tasks = await Task.find(); 
        return res.json(tasks); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching tasks");
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
