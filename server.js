import express from "express";
import cors from "cors";
import fs from "fs";
import { scrapeJobs } from "./scraper.js";

const app = express();
app.use(cors());

const DB = "./jobs.json";
if (!fs.existsSync(DB)) fs.writeFileSync(DB, "[]");

app.get("/jobs", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(DB)));
});

setInterval(async () => {
  console.log("Checking Upwork...");
  const fresh = await scrapeJobs();
  const saved = JSON.parse(fs.readFileSync(DB));

  const newOnes = fresh.filter(j => !saved.some(s => s.link === j.link));

  if (newOnes.length > 0) {
    fs.writeFileSync(DB, JSON.stringify([...newOnes, ...saved], null, 2));
  }
}, 60000);

app.listen(3000, () => console.log("Backend running"));