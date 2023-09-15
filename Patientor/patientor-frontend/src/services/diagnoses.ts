import axios from "axios";

const baseUrl = "http://localhost:3001/api/diagnoses";

const getDiagnoses = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

export default { getDiagnoses };
