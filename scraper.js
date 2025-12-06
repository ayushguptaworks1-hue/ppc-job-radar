import { chromium } from "playwright";
import fs from "fs";
import { SEARCH_URLS } from "./config.js";

const COOKIE = "./cookies.json";

export async function scrapeJobs() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  if (fs.existsSync(COOKIE)) {
    context.addCookies(JSON.parse(fs.readFileSync(COOKIE)));
  }

  const page = await context.newPage();
  let all = [];

  for (const url of SEARCH_URLS) {
    await page.goto(url, { timeout: 60000 });
    await page.waitForTimeout(3000);

    const jobs = await page.evaluate(() =>
      [...document.querySelectorAll("section.air3-card")].map((c) => ({
        title: c.querySelector("a")?.innerText || "",
        link: "https://www.upwork.com" + c.querySelector("a")?.getAttribute("href"),
        posted: c.innerText.match(/Posted\s(.*)/)?.[1] || ""
      }))
    );
    all.push(...jobs);
  }

  await browser.close();
  return all;
}
