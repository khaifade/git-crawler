import express from "express";
import dotenv from "dotenv";
import githubRouter from "./routes/github.route.mjs";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
app.use("/api", githubRouter);

app.get("/", async (req, res) => {
  res.send("Healthy");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
