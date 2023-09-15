import { Patient } from "../types";
import patientService from "../services/patients";
import diagonoseService from "../services/diagnoses";
import { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { Diagnose } from "../types";
import EntryDetail from "./EntryDetail";
import EntryForm from "./EntryForm";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const getPatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      const diagnoses = await diagonoseService.getDiagnoses();

      if (patient) {
        setPatient(patient);
      }

      setDiagnoses(diagnoses);
    };

    if (id) {
      getPatient(id);
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Birthday: {patient.dateOfBirth}</p>
      <br></br>

      <EntryForm patient={patient} setPatient={setPatient}></EntryForm>

      <h4>Entries</h4>
      {patient.entries.map((e) => (
        <div key={e.id}>
          <p>
            {e.date} {e.description}
          </p>

          <EntryDetail entry={e}></EntryDetail>
          <p>Diagnosed by {e.specialist}</p>

          <ul>
            {e.diagnosisCodes?.map((c) => (
              <li key={c}>
                {c} {diagnoses.find((d) => d.code === c)?.name}
              </li>
            ))}
          </ul>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default SinglePatient;
