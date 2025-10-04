chrome.runtime.sendMessage({ type: "getPatterns" }, (response) => {
  if (!response || !response.patterns) return;

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("pageCleaner.js");
  script.dataset.patterns = JSON.stringify(response.patterns); // pass patterns via dataset
  (document.head || document.documentElement).appendChild(script);
  script.remove();
});
