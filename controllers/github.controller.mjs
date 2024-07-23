import {
  fetchAndCountCommits,
  getBasicInfo,
  getTotalCommits,
  getTodayCommits,
} from "../services/github.service.mjs";

export async function getGithubRepository(req, res) {
  const { repo, owner } = req.query;
  try {
    const basicInfo = await getBasicInfo(owner, repo);
    const totalCommits = await getTotalCommits(owner, repo);
    const commitCountsPerDay = await fetchAndCountCommits(owner, repo);
    res.send({ basicInfo, totalCommits, commitCountsPerDay });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
export async function getGithubTodayCommits(req, res) {
  const { repo, owner } = req.query;
  try {
    const commitToday = await getTodayCommits(owner, repo);
    res.send({ commitToday });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
