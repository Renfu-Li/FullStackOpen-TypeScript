import {
  Gender,
  NewPatient,
  EntryWithoutId,
  Diagnose,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringProps = (prop: unknown): string => {
  if (prop && isString(prop)) {
    return prop;
  } else {
    throw new Error("param missing or is not string");
  }
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(text);
};

const parseGender = (gender: unknown): Gender => {
  if (gender && isString(gender) && isGender(gender)) {
    return gender;
  } else {
    throw new Error("missing or incorrect Gender");
  }
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(value));
};

const parseRating = (rating: unknown): HealthCheckRating => {
  console.log("rating: ", rating);

  if (typeof rating === "number" && isHealthCheckRating(rating)) {
    return rating;
    // return rating as HealthCheckRating;
  } else {
    throw new Error("missing or incorrect Rating");
  }
};

const isDate = (text: string): boolean => {
  return !isNaN(Date.parse(text));
};

const parseDate = (date: unknown): string => {
  if (date && isString(date) && isDate(date)) {
    return date;
  } else {
    throw new Error("missing or incorrect birth date");
  }
};

export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("missing or incorrect data");
  }

  if (
    "name" in obj &&
    "dateOfBirth" in obj &&
    "ssn" in obj &&
    "gender" in obj &&
    "occupation" in obj &&
    "entries" in obj
  ) {
    const { name, dateOfBirth, ssn, gender, occupation } = obj;
    const newPatient = {
      name: parseStringProps(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseStringProps(ssn),
      gender: parseGender(gender),
      occupation: parseStringProps(occupation),
      entries: [],
    };

    return newPatient;
  } else {
    throw new Error("some fields are missing");
  }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  console.log("object from parser", object);

  if (!object) {
    throw new Error("object doesn't exist");
  }

  if (typeof object !== "object") {
    throw new Error("object is not of type object");
  }

  if (!("diagnosisCodes" in object)) {
    throw new Error("diagnosisCodes not in object");
  }

  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

// const assertNever = (value: never): never => {
//   throw new Error(`Unhandled enty type member: ${JSON.stringify(value)}`);
// };

export const toNewDiagnose = (object: unknown): EntryWithoutId => {
  console.log("object from toNewDiagnose: ", object);

  if (!object || typeof object !== "object") {
    throw new Error("missing or incorrect data");
  }

  if (
    "date" in object &&
    "specialist" in object &&
    "description" in object &&
    "type" in object
  ) {
    const { date: entryDate, specialist, description } = object;

    switch (object.type) {
      case "Hospital": {
        if (
          "discharge" in object &&
          object.discharge &&
          typeof object.discharge === "object" &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        ) {
          const { date, criteria } = object["discharge"];

          let newEntry: EntryWithoutId = {
            date: parseDate(entryDate),
            specialist: parseStringProps(specialist),
            description: parseStringProps(description),
            discharge: {
              date: parseDate(date),
              criteria: parseStringProps(criteria),
            },
            type: "Hospital" as "Hospital",
          };

          if ("diagnosisCodes" in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object);
          }

          return newEntry;
        } else {
          throw new Error("missing or incorrect fields");
        }
      }

      case "OccupationalHealthcare": {
        if ("employerName" in object) {
          const { employerName } = object;

          let newEntry: EntryWithoutId = {
            date: parseDate(entryDate),
            specialist: parseStringProps(specialist),
            description: parseStringProps(description),
            employerName: parseStringProps(employerName),
            type: "OccupationalHealthcare" as "OccupationalHealthcare",
          };

          if (
            "sickLeave" in object &&
            object.sickLeave &&
            typeof object.sickLeave === "object" &&
            "startDate" in object.sickLeave &&
            "endDate" in object.sickLeave
          ) {
            const { startDate, endDate } = object.sickLeave;

            if (startDate !== "" && endDate !== "") {
              newEntry.sickLeave = {
                startDate: parseDate(startDate),
                endDate: parseDate(endDate),
              };
            }
          }

          if ("diagnosisCodes" in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object);
          }

          return newEntry;
        } else {
          throw new Error("missing or incorrect fields");
        }
      }

      case "HealthCheck": {
        if ("healthCheckRating" in object) {
          const { healthCheckRating } = object;
          console.log("in HealthCheck");
          console.log("healthCheckRating: ", healthCheckRating);

          let newEntry: EntryWithoutId = {
            date: parseDate(entryDate),
            specialist: parseStringProps(specialist),
            description: parseStringProps(description),
            healthCheckRating: parseRating(healthCheckRating),
            type: "HealthCheck" as "HealthCheck",
          };

          console.log("newEntry in HealthCheck: ", newEntry);

          if ("diagnosisCodes" in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object);
          }

          return newEntry;
        } else {
          throw new Error("missing or incorrect fields");
        }
      }

      default:
        throw new Error("missing or incorrect fields");
    }
  } else {
    throw new Error("missing or incorrect fields");
  }
};
