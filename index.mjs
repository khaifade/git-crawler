import express from "express";
import dotenv from "dotenv";
import githubRouter from "./routes/github.route.mjs";
dotenv.config();

const app = express();
const port = 3000;

app.use("/api", githubRouter);

app.get("/", async (req, res) => {
  res.send("Healthy");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
