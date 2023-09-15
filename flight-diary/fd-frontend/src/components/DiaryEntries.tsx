import Entry from "./Entry";
import { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  diaries: DiaryEntry[];
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <>
      <h3>Diary Entries</h3>
      {props.diaries.map((diary) => (
        <Entry
          key={diary.id}
          date={diary.date}
          visibility={diary.visibility}
          weather={diary.weather}
          comment={diary.comment}
        ></Entry>
      ))}
    </>
  );
};

export default DiaryEntries;
