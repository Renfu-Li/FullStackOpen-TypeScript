import axios, { AxiosError } from "axios";
import { DiaryEntry, DiaryInput } from "./types";

const baseUrl = "http://localhost:3001";

const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`);

  return response.data;
};

const addDiary = async (newDiary: DiaryInput | AxiosError) => {
  const response = await axios.post<DiaryEntry>(
    `${baseUrl}/api/diaries`,
    newDiary
  );

  return response.data;
};

export default { getAllDiaries, addDiary };
