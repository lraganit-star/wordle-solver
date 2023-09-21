const express = require("express");
const cors = require("cors");
const app = express();
const wordleModule = require("./wordle_solution.cjs");
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/api", (req, res) => {
  console.log(req.body.letterColors);
  res.json("Array received!");
});

app.get("/api", (req, res) => {
  res.json(wordleModule());
});

app.listen(PORT, () => {
  console.log(`Server started on port 8000`);
});
