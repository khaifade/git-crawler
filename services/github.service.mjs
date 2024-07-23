import { Octokit } from "octokit";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();
const octokit = new Octokit({
  auth: process.env.TOKEN,
});

async function getTotalCommits(owner, repo) {
  const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner,
    repo,
    per_page: 1,
    page: 1,
  });
  const linkHeader = response.headers.link;
  // Regular expression to match the URL with rel="last" and capture the page number
  const regex = /page=(\d+)>; rel="last"/;
  const match = linkHeader.match(regex);
  // Extract the page number
  const pageNumber = match ? match[1] : null;

  console.log(pageNumber); // Outputs: 23864
  return Number(pageNumber);
}
async function getBasicInfo(owner, repo) {
  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });
  const data = response.data;
  console.log("forks: ", data.forks);
  console.log("open_issues: ", data.open_issues);
  console.log("stargazers_count: ", data.stargazers_count);
  console.log("watch: ", data.subscribers_count);
  return {
    forks: data.forks,
    open_issues: data.open_issues,
    stargazers_count: data.stargazers_count,
    watch: data.subscribers_count,
  };
}
async function getTodayCommits(owner, repo) {
  const today = moment().format("YYYY-MM-DD");
  const commitToday = {
    [today]: 0,
  };
  let page = 1;
  let hasMoreCommits = true;

  try {
    while (hasMoreCommits) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner,
          repo,
          per_page: 100,
          page,
        }
      );

      if (response.data.length === 0) {
        break; // No more commits to process
      }

      for (const { commit } of response.data) {
        const date = commit.author.date.split("T")[0];
        if (date === today) {
          commitToday[today]++;
        } else {
          hasMoreCommits = false;
          break; // Found a commit not from today, stop processing
        }
      }

      if (response.data.length < 100) {
        break; // Less than 100 commits means this was the last page
      }

      page++; // Prepare to fetch the next page
    }
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw error; // Rethrow or handle as needed
  }

  return commitToday;
}
async function fetchAndCountCommits(owner, repo) {
  const commitCountsPerDay = {};
  const totalCommits = await getTotalCommits(owner, repo);
  const totalPages = Math.ceil(totalCommits / 100);
  for (let i = 1; i <= totalPages; i++) {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner,
        repo,
        per_page: 100,
        page: i,
      }
    );
    response.data.forEach(({ commit }) => {
      const date = commit.author.date.split("T")[0];
      commitCountsPerDay[date] = (commitCountsPerDay[date] || 0) + 1;
    });
  }

  return commitCountsPerDay;
}
export { getBasicInfo, getTotalCommits, fetchAndCountCommits, getTodayCommits };
