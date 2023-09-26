const express = require("express");
const cors = require("cors");
const app = express();
const wordleModule = require("./wordle_solution.cjs");
const PORT = 8000;

app.use(cors());
app.use(express.json());

let dataReceived;

app.post("/api", (req, res) => {
  dataReceived = req.body.colorArray;
  console.log(dataReceived);
  res.status(200).send({ message: "Data received" });
});

app.get("/api", (req, res) => {
  res.json(wordleModule());
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = { getData: () => dataReceived };
