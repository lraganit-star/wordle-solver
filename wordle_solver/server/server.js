const express = require("express");
const cors = require("cors");
const app = express();
const wordleModule = require("./wordle_solution.cjs");
const PORT = 8000;

app.use(cors());

app.get("/api", (req, res) => {
  wordleModule();
});

app.listen(PORT, () => {
  console.log(`Server started on port 8000`);
});
