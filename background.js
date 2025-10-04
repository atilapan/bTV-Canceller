const GITHUB_LIST_URL = "https://raw.githubusercontent.com/atilapan/btv-canceller/main/suspect-patterns.json";
const DEFAULT_PATTERNS = ["potxb60894kdqhbkjwvu1759482158"];

let cachedPatterns = null;

async function fetchPatterns() {
  if (cachedPatterns) return cachedPatterns;
  try {
    const res = await fetch(GITHUB_LIST_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = await res.json();
    if (Array.isArray(list) && list.length > 0) {
      cachedPatterns = list;
      console.log("[bTV Canceller] Loaded patterns from GitHub:", list);
      return list;
    }
  } catch (e) {
    console.warn("[bTV Canceller] Using fallback patterns:", e);
  }
  cachedPatterns = DEFAULT_PATTERNS;
  return DEFAULT_PATTERNS;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "getPatterns") {
    fetchPatterns().then(patterns => sendResponse({ patterns }));
    return true; // async response
  }
});
