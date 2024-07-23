import express from "express";
import {
  getGithubRepository,
  getGithubTodayCommits,
} from "../controllers/github.controller.mjs";
const router = express.Router();
router.get("/github", getGithubRepository);
router.get("/github/today-commits", getGithubTodayCommits);
export default router;
