import { Entry, HealthCheckRating } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled enty type member: ${JSON.stringify(value)}`);
};

interface EntryDetailProps {
  entry: Entry;
}
const EntryDetail = (props: EntryDetailProps) => {
  const ratings = ["Healthy", "Low Risk", "High Risk", "Critical Risk"];

  switch (props.entry.type) {
    case "HealthCheck":
      return (
        <p>Health Check Rating: {ratings[props.entry.healthCheckRating]}</p>
      );
    case "Hospital":
      return (
        <p>
          Discharged on {props.entry.discharge.date} because:{" "}
          {props.entry.discharge.criteria}
        </p>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>Employer name: {props.entry.employerName}</p>
          {props.entry.sickLeave ? (
            <p>
              Sick leave - start date: {props.entry.sickLeave.startDate} End
              date: {props.entry.sickLeave.endDate}
            </p>
          ) : null}
        </div>
      );
    default:
      return assertNever(props.entry);
  }
};

export default EntryDetail;
