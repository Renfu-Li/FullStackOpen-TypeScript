import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (id: string, object: EntryWithoutId) => {
  console.log("id from frontend service: ", id);
  console.log("object from frontend service: ", object);
  
  try {
    const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object)
    console.log("response.data: ", response.data);
    
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.error(error)
    }
  }
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getPatient,
  create,
  createEntry
};
