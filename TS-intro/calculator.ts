export type Operation = "add" | "multiply" | "divide";

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "add": {
      return a + b;
    }
    case "multiply": {
      return a * b;
    }
    case "divide": {
      if (b === 0) {
        throw new Error("can't divide by 0");
      } else {
        return a / b;
      }
    }
    default: {
      throw new Error("unknown operation");
    }
  }
};

try {
  calculator(2, 4, "divide");
} catch (error: unknown) {
  let errorMessage = "something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage);
}
