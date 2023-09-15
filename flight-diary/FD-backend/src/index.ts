import express from "express";
import diaryRouter from "./routes/diaryRouter";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/diaries", diaryRouter);
app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
