import diaries from "../data/entries";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const getDiaries = (): DiaryEntry[] => {
  return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((diary) => diary.id === id);
  return entry;
};

const getNonSensitiveDiaries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return { id, date, weather, visibility };
  });
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((diary) => diary.id)) + 1,
    ...entry,
  };

  diaries.push(newDiary);
  return newDiary;
};

export default { getDiaries, getNonSensitiveDiaries, addDiary, findById };
