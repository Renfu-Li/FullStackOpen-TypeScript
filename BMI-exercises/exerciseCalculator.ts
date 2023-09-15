interface ExerciseReview {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArgs = (args: string[]) => {
  const realArgs = args.slice(2);
  if (args.length < 5) {
    return { error: "daily exercise hours not provided" };
  }

  if (realArgs.every((arg) => !isNaN(Number(arg)))) {
    return realArgs.map((arg) => Number(arg));
  }

  return null;
};

export const calculateExercises = (exerciseHours: number[]): ExerciseReview => {
  const [target, ...dailyHours] = exerciseHours;
  const trainingDays = dailyHours.reduce(
    (count, hours) => (hours > 0 ? (count += 1) : count),
    0
  );

  let trainingDaysAgain = 0;
  for (let i: number = 0; i < dailyHours.length; i++) {
    if (dailyHours[i] > 0) {
      trainingDaysAgain += 1;
    }
  }
  console.log(trainingDays);

  console.log(trainingDaysAgain);

  let rating;
  let ratingDescription;
  let success;
  const totalHours = dailyHours.reduce(
    (totalHours, hours) => totalHours + hours,
    0
  );
  const average = totalHours / dailyHours.length;

  if (average < 1.5) {
    rating = 1;
    ratingDescription = "You fell short of the daily exercise goal";
    success = false;
  } else if (average < 2.5) {
    rating = 2;
    ratingDescription = "You achieved the daily exercise goal";
    success = true;
  } else {
    rating = 3;
    ratingDescription = "You exceeded the daily exercise goal";
    success = true;
  }

  return {
    periodLength: dailyHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const argsArray = parseExerciseArgs(process.argv);

  console.log(calculateExercises(argsArray as number[]));
} catch (error) {
  let errorMessage = "Something bad happened";

  if (error instanceof Error) {
    errorMessage = errorMessage + error.message;
  }

  console.log(errorMessage);
}
