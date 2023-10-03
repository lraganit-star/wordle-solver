const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const wordleModule = require("./wordle_solution.cjs");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
