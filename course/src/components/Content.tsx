import CoursePart from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>
              {props.name} {props.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{props.description}</em>
          </p>
        </div>
      );

    case "background":
      return (
        <div>
          <p>
            <strong>
              {props.name} {props.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{props.description}</em>
          </p>
          <p>{props.backgroundMaterial}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <p>
            <strong>
              {props.name} {props.exerciseCount}
            </strong>
          </p>

          <p>project exercises {props.groupProjectCount}</p>
        </div>
      );

    default:
      return null;
  }
};

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
                kind="basic"
              ></Part>
            );

          case "background":
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
                backgroundMaterial={part.backgroundMaterial}
                kind="background"
              ></Part>
            );

          case "group":
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                groupProjectCount={part.groupProjectCount}
                kind="group"
              ></Part>
            );

          default:
            return assertNever(part);
        }
      })}
    </>
  );
};

export default Content;
