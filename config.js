export const KEYWORDS = [
  "google ads","meta ads","facebook ads","instagram ads",
  "ppc","bing ads","microsoft ads","performance marketing",
  "conversion tracking"
];
export const SEARCH_URLS = KEYWORDS.map(k =>
  "https://www.upwork.com/nx/search/jobs/?q=" + encodeURIComponent(k) + "&sort=recency"
);