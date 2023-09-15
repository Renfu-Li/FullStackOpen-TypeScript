import { NonSensitivePatient, NewPatient, Patient, EntryWithoutId, Entry } from "../types";
import patients from "../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return { id, name, dateOfBirth, gender, occupation, entries };
    }
  );
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const addedPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(addedPatient);
  return addedPatient;
};

const createEntry = (id: string, object: EntryWithoutId): Entry => {
  console.log("id from backend:", id);
  
  console.log("object from backend: ", object);
  
  
  const addedEntry = {
    ...object,
    id: uuid()
  }

  console.log("addedEntry from backend: ", addedEntry);
  

  patients.find(p => p.id === id)?.entries.push(addedEntry);
  return addedEntry;
}

export default { getPatients, getPatient, addPatient, createEntry };
