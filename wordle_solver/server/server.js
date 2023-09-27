const express = require("express");
const cors = require("cors");
const app = express();
const wordleModule = require("./wordle_solution.cjs");
const PORT = 8000;

app.use(cors());
app.use(express.json());

let dataReceived;

app.post("/api", async (req, res) => {
  const colorArray = req.body.colorArray;

  console.log(colorArray); // log the received colorArray
  dataReceived = req.body.colorArray; // save the colorArray

  try {
    const bestWord = await wordleModule.myAsyncFunction(colorArray);
    res.status(200).send({
      bestWord: bestWord,
      colorArray: colorArray,
      message: "Data received",
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
