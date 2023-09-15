type BmiResult =
  | "underweight"
  | "Normal (healthy weight)"
  | "overweight"
  | "obesity";

interface HeightWeightValues {
  height: number;
  weight: number;
}

const parseBmiArgs = (args: string[]): HeightWeightValues => {
  if (args.length < 4) {
    throw new Error("not enough arguments");
  }
  if (args.length > 4) {
    throw new Error("too many arguments");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided arguments are not all numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): BmiResult => {
  const BMI = weight / ((height * height) / 10000);

  if (BMI < 18.5) {
    return "underweight";
  } else if (BMI < 25) {
    return "Normal (healthy weight)";
  } else if (BMI < 30) {
    return "overweight";
  } else {
    return "obesity";
  }
};

try {
  const { height, weight } = parseBmiArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";

  if (error instanceof Error) {
    errorMessage = errorMessage + error.message;
  }

  console.log(errorMessage);
}
