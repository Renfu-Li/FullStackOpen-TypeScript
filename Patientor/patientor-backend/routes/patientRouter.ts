import express from "express";
import patientService from "../services/patientService";
import {toNewPatient} from "../utils";
import {toNewDiagnose} from "../utils"


const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const result = patientService.getPatients();
  res.status(200).json(result);
});

patientRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  try {
    const addedPatient = patientService.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage = errorMessage + "Error" + error.message;
    }

    console.log(errorMessage);
  }
});

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const patient = patientService.getPatient(id);
    res.status(200).json(patient);
  } catch (error) {
    let errorMessage = "Something went wrong. ";

    if (error instanceof Error) {
      errorMessage = errorMessage + "Error: " + error.message;
    }

    console.log(errorMessage);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const entryInput = toNewDiagnose(req.body);
    const addedEntry = patientService.createEntry(id, entryInput)
    
    res.status(200).json(addedEntry)
  } catch(error) {
    let errorMessage = "Something went wrong ";

    if (error instanceof Error) {
      errorMessage = errorMessage + "Error: " + error.message
    }

    res.status(400).send(errorMessage)
  }
})

export default patientRouter;
