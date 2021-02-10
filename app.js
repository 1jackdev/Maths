const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean", (req, res) => {
  let nums = req.query.nums;
  if (!nums) {
    res.send(400, "Please provide some numbers.");
  }
  let arr = nums.split(",");
  let sum = arr.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr));
  if (!sum) {
    res.send(400, "All values must be numbers");
  } else {
    res.send(200, {
      operation: "mean",
      value: Number(sum / arr.length).toFixed(1),
    });
  }
});
app.get("/median", (req, res) => {
  let nums = req.query.nums;
  if (!nums) {
    res.send(400, "Please provide some numbers.");
  }
  res.send(200, nums);
});



app.get("/mode", (req, res) => {
  res.send("Hello yall");
});

app.listen(5000, () => console.log("Hi there"));
