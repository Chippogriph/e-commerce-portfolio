import express from "express";

const port = 8000;

const app = express();

app.get("/api/tasks", (req, res) => {
    const tasks = [
        { id: 1, name: "Städa"},
        { id: 2, name: "Tvätta"},
    ];
    res.json(tasks);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})