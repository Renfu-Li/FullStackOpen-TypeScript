import express from "express";
import diagnoseService from "../services/diagnoseService";


const diagnoseRoute = express.Router();

diagnoseRoute.get("/", (_req, res) => {
  const diagnoses = diagnoseService.getDiagnoses();

  res.status(200).json(diagnoses);
});



export default diagnoseRoute;
