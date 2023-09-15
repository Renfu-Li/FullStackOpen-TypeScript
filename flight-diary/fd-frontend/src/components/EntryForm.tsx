import axios from "axios";
import { useState } from "react";
import diaryService from "../diaryService";
import { DiaryEntry, DiaryInput } from "../types";
import { log } from "console";
// import { Weather, Visibility, NewDiary, DiaryInput } from "../types";

interface EntryFormProps {
  diaries: DiaryEntry[];
  setDiaries: (newDiaries: DiaryEntry[]) => void;
  setMessage: (message: string) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const addedDiary = await diaryService.addDiary(newDiary);
      const updatedDiaries = props.diaries.concat(addedDiary);
      props.setDiaries(updatedDiaries);

      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");

      console.log(addedDiary);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        props.setMessage(error.response?.data.error);
        setTimeout(() => props.setMessage(""), 5000);
      }
    }
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={onSubmit}>
        <div>
          date
          <input
            value={date}
            type="date"
            onChange={(event) => setDate(event.target.value)}
          ></input>
        </div>
        <div>
          visibility
          <label>
            great
            <input
              type="radio"
              value="great"
              checked={visibility === "great"}
              onChange={(e) => setVisibility(e.target.value)}
            ></input>
          </label>
          <label>
            good
            <input
              type="radio"
              value="good"
              checked={visibility === "good"}
              onChange={(e) => setVisibility(e.target.value)}
            ></input>
          </label>
          <label>
            ok
            <input
              type="radio"
              value="ok"
              checked={visibility === "ok"}
              onChange={(e) => setVisibility(e.target.value)}
            ></input>
          </label>
          <label>
            poor
            <input
              type="radio"
              value="poor"
              checked={visibility === "poor"}
              onChange={(e) => setVisibility(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          weather
          <label>
            sunny
            <input
              type="radio"
              value="sunny"
              checked={weather === "sunny"}
              onChange={(e) => setWeather(e.target.value)}
            ></input>
          </label>
          <label>
            rainy
            <input
              type="radio"
              value="rainy"
              checked={weather === "rainy"}
              onChange={(e) => setWeather(e.target.value)}
            ></input>
          </label>
          <label>
            cloudy
            <input
              type="radio"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={(e) => setWeather(e.target.value)}
            ></input>
          </label>
          <label>
            stormy
            <input
              type="radio"
              value="stormy"
              checked={weather === "stormy"}
              onChange={(e) => setWeather(e.target.value)}
            ></input>
          </label>
          <label>
            windy
            <input
              type="radio"
              value="windy"
              checked={weather === "windy"}
              onChange={(e) => setWeather(e.target.value)}
            ></input>
          </label>
        </div>

        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></input>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default EntryForm;
