const express = require("express");
const cors = require("cors");
const app = express();
const wordleModule = require("./wordle_solution.cjs");
const PORT = 8000;

app.use(cors());
app.use(express.json());

let colorArr;

app.post("/api", async (req, res) => {
  const colorArray = req.body.colorArray;

  colorArr = req.body.colorArray; // save the colorArray

  try {
    const bestWord = await wordleModule.bestWordGenerator(colorArray);
    res.status(200).send({
      bestWord: bestWord,
      colorArray: colorArray,
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "There was an error handling your request." });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});
