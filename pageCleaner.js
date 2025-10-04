(() => {
  // Get patterns passed from injectCleaner.js
  const raw = document.currentScript?.dataset?.patterns || "[]";
  let patternList = [];
  try {
    const arr = JSON.parse(raw);
    patternList = arr.map(s => new RegExp(s));
  } catch (e) {
    console.error("[bTV Canceller] Failed to parse patterns:", e);
  }

  function cleanVariables() {
    for (const key of Object.keys(window)) {
      if (patternList.some(p => p.test(key))) {
        if(typeof window[key] == undefined) continue;

        try {
          console.log("[bTV Canceller] Undefining:", key);
          delete window[key];
          window[key] = undefined;
        } catch (e) {
          try { window[key] = undefined; } catch (_) {}
        }
      }
    }
  }

  // Run continuously
  cleanVariables();
  setInterval(cleanVariables, 2000);
})();
