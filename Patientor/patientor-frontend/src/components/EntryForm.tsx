import { useState } from "react";
import { HealthCheckRating, Patient } from "../types";
import patientService from "../services/patients";
import DiagnoseCodeSelector from "./DiagnoseCodeSelector";

interface EntryFormProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [type, setType] = useState("Hospital");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const addDiagnosisCode = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const updatedDiagnosisCodes = [...diagnosisCodes, diagnosisCode];

    setDiagnosisCodes(updatedDiagnosisCodes);

    setDiagnosisCode("");
  };

  // const onHealthCheckRatingChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = parseInt(e.target.value);
  //   if (!isNaN(value) && value >= 0 && value <= 3) {
  //     const healthCheckRating = Object.values(HealthCheckRating).find(
  //       (r) => r.toString() === e.target.value
  //     );
  //     if (healthCheckRating) {
  //       setHealthCheckRating(Number(healthCheckRating));
  //     }
  //   }
  // };

  //  as HealthCheckRating

  const submitEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!type) {
      throw new Error("You must choose an entry type first");
    }

    const entryFormInput =
      type === "HealthCheck"
        ? {
            date,
            specialist,
            description,
            healthCheckRating,
            diagnosisCodes,
            type: "HealthCheck" as "HealthCheck",
          }
        : type === "OccupationalHealthcare"
        ? {
            date,
            specialist,
            description,
            diagnosisCodes,
            employerName,
            sickLeave: {
              startDate,
              endDate,
            },
            type: "OccupationalHealthcare" as "OccupationalHealthcare",
          }
        : {
            date,
            specialist,
            description,
            diagnosisCodes,
            discharge: {
              date: dischargeDate,
              criteria,
            },
            type: "Hospital" as "Hospital",
          };

    console.log("entryFormInput: ", entryFormInput);

    const addedEntry = await patientService.createEntry(
      props.patient.id,
      entryFormInput
    );

    console.log("addedEntry from frontend: ", addedEntry);

    if (addedEntry) {
      props.setPatient({
        ...props.patient,
        entries: props.patient.entries.concat(addedEntry),
      });

      setDate("");
      setSpecialist("");
      setDescription("");
      setDiagnosisCode("");
      setDischargeDate("");
      setCriteria("");
      setEmployerName("");
      setStartDate("");
      setEndDate("");
      setHealthCheckRating(HealthCheckRating.Healthy);
      setDiagnosisCodes([]);
    }
  };

  return (
    <div>
      <h4>New Healthcheck Entry</h4>

      <p>Choose an Entry type:</p>
      <form>
        <label>
          <input
            type="radio"
            name="type"
            onChange={() => setType("Hospital")}
          ></input>
          Hospital
        </label>
        <label>
          <input
            type="radio"
            name="type"
            onChange={() => setType("OccupationalHealthcare")}
          ></input>
          OccupationalHealthcare
        </label>
        <label>
          <input
            type="radio"
            name="type"
            onChange={() => setType("HealthCheck")}
          ></input>
          HealthCheck
        </label>
      </form>

      <form>
        <div>
          <label htmlFor="dateInput">date: </label>
          <input
            id="dateInput"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="specialistInput">sepcialist: </label>
          <input
            id="specialistInput"
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="descriptionInput">description: </label>
          <input
            id="descriptionInput"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>

        <DiagnoseCodeSelector
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        ></DiagnoseCodeSelector>

        {/* <div>
          <label htmlFor="diagnosisCodeInput">
            diagnosis code (if applicable):{" "}
          </label>
          <input
            id="diagnosisCodeInput"
            type="text"
            value={diagnosisCode}
            onChange={(e) => setDiagnosisCode(e.target.value)}
          ></input>
          <span>{diagnosisCodes} added </span>
          <button type="submit" onClick={addDiagnosisCode}>
            Add a diagnosis code
          </button>
        </div> */}

        {type === "HealthCheck" ? (
          <div>
            <p>Choose a Health Check Rating:</p>

            <label>
              <input
                type="radio"
                name="type"
                onChange={() => setHealthCheckRating(0)}
              ></input>
              Healthy
            </label>
            <label>
              <input
                type="radio"
                name="type"
                onChange={() => setHealthCheckRating(1)}
              ></input>
              Low Risk
            </label>
            <label>
              <input
                type="radio"
                name="type"
                onChange={() => setHealthCheckRating(2)}
              ></input>
              High Risk
            </label>
            <label>
              <input
                type="radio"
                name="type"
                onChange={() => setHealthCheckRating(3)}
              ></input>
              Critical Risk
            </label>

            {/* <label htmlFor="healthCheckRatingInput">healthCheckRating: </label>
            <input
              id="healthCheckRatingInput"
              type="text"
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            ></input> */}
          </div>
        ) : type === "Hospital" ? (
          <div>
            <div>
              <label>
                date discharged:{" "}
                <input
                  type="date"
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                ></input>
              </label>
            </div>

            <div>
              <label>
                criteria:{" "}
                <input
                  value={criteria}
                  onChange={(e) => setCriteria(e.target.value)}
                ></input>
              </label>
            </div>
          </div>
        ) : type === "OccupationalHealthcare" ? (
          <div>
            <div>
              <label>
                employer name:{" "}
                <input
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                ></input>
              </label>
            </div>

            <p>sick leave (if applicable):</p>

            <div>
              <label>
                start date:{" "}
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </label>
            </div>

            <div>
              <label>
                end date:{" "}
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </label>
            </div>
          </div>
        ) : null}

        <button type="submit" onClick={submitEntry}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
