import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils";
import { NewDiaryEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = diaryService.getDiaries();
  res.status(200).json(result);
});

router.get("/:id", (req, res) => {
  const entry = diaryService.findById(Number(req.params.id));

  if (entry) {
    res.status(200).json(entry);
  } else {
    res.status(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newDiary: NewDiaryEntry = toNewDiaryEntry(req.body);
    const addedDiary = diaryService.addDiary(newDiary);
    res.status(200).json(addedDiary);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage = errorMessage + " Error: " + error.message;
    }

    res.status(400).json({ error: errorMessage });
  }
});

export default router;
