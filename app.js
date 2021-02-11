const express = require("express");
const { PassThrough } = require("stream");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getMode(array) {
  const obj = {};
  array.forEach((number) => {
    if (!obj[number]) {
      obj[number] = 1;
    } else {
      obj[number]++;
    }
  });
  let biggestNum = 0;
  let biggestNumKey = -Infinity;
  for (let key in obj) {
    const value = obj[key];
    if (value >= biggestNum && Number(key) > biggestNumKey) {
      biggestNum = value;
      biggestNumKey = Number(key);
    }
  }
  return biggestNumKey;
}

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
  let queryNums = req.query.nums;
  if (!queryNums) {
    res.send(400, "Please provide some numbers.");
  }
  let numberArr = new Array();
  let median;
  for (let num of queryNums.split(",")) {
    if (!num == "") {
      numberArr.push(+num);
    }
  }
  numberArr.sort(function (a, b) {
    return a - b;
  });
  let mid = Math.floor(numberArr.length / 2);
  if (numberArr.length % 2 !== 0) {
    median = numberArr[mid];
  } else {
    median = (numberArr[mid] + numberArr[mid - 1]) / 2;
  }
  res.send(200, median);
});

app.get("/mode", (req, res) => {
  let queryNums = req.query.nums;
  let numberArr = new Array();
  for (let num of queryNums.split(",")) {
    if (!num == "") {
      numberArr.push(+num);
    }
  }
  let biggestNum = getMode(numberArr);
  if (numberArr.length < 2) {
    res.send(400, "Please provide at least 2 numbers");
  }

  res.send(200, biggestNum);
});

app.listen(5000);
