import express from "express";
// const express = require("express")
import { calculateBmi } from "./calculateBMI";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get(`/bmi`, (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.status(200).json({
      weight,
      height,
      bmi,
    });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (
    isNaN(Number(target)) ||
    daily_exercises.some((hours: string) => isNaN(Number(hours)))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises([target, ...daily_exercises]);
  res.status(200).json({ result });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
