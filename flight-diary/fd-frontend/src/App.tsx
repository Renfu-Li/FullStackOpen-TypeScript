import { useEffect, useState } from "react";
import diaryService from "./diaryService";
import { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";
import EntryForm from "./components/EntryForm";
import Notify from "./components/Notify";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    diaryService.getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div className="App">
      <Notify message={message} setMessage={setMessage}></Notify>
      <EntryForm
        diaries={diaries}
        setDiaries={setDiaries}
        setMessage={setMessage}
      ></EntryForm>
      <DiaryEntries diaries={diaries}></DiaryEntries>
    </div>
  );
}

export default App;
