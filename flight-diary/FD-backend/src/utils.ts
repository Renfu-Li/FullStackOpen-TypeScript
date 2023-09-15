import { NewDiaryEntry } from "./types";
import { Weather, Visibility } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error("comment missing or not string");
  } else {
    return comment;
  }
};

const isDate = (date: string): boolean => {
  return isString(date) && !isNaN(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (isString(date) && isDate(date)) {
    return date;
  } else {
    throw new Error("missing or malformatted date");
  }
};

const parseWeather = (weather: unknown): Weather => {
  if (isString(weather) && isWeather(weather)) {
    return weather;
  } else {
    throw new Error("missing or not predefined weathers");
  }
};

const isWeather = (weather: string): weather is Weather => {
  return Object.values(Weather)
    .map((value) => value.toString())
    .includes(weather);
};
const parseVisibility = (visibility: unknown): Visibility => {
  if (isString(visibility) && isVisibility(visibility)) {
    return visibility;
  } else {
    throw new Error("missing or incorrect weathers");
  }
};

const isVisibility = (visibility: string): visibility is Visibility => {
  return Object.values(Visibility)
    .map((value) => value.toString())
    .includes(visibility);
};

const toNewDiaryEntry = (bodyObj: unknown): NewDiaryEntry => {
  if (!bodyObj || typeof bodyObj !== "object") {
    throw new Error("missing or incorrect data");
  }

  if (
    "date" in bodyObj &&
    "comment" in bodyObj &&
    "weather" in bodyObj &&
    "visibility" in bodyObj
  ) {
    const newEntry: NewDiaryEntry = {
      date: parseDate(bodyObj.date),
      comment: parseComment(bodyObj.comment),
      weather: parseWeather(bodyObj.weather),
      visibility: parseVisibility(bodyObj.visibility),
    };

    return newEntry;
  } else {
    throw new Error("some fields are missing!");
  }
};

export default toNewDiaryEntry;
