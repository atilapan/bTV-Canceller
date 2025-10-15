(function() {
  function regexListFromStrings(strings) {
    return strings.map(s => {
      try {
        return new RegExp(s);
      } catch (e) {
        console.warn("[bTV Canceller] Invalid regex in list:", s, e);
        return null;
      }
    }).filter(Boolean);
  }

  function isSuspectScript(el, patterns) {
    if (el.tagName !== "SCRIPT") return false;
    if (el.src) return patterns.some(p => p.test(el.src));
    if (el.textContent) return patterns.some(p => p.test(el.textContent));
    return false;
  }

  function removeIfSuspect(el, patterns) {
    if (isSuspectScript(el, patterns)) {
      console.log("[bTV Canceller] Removing suspect script:", el.src || el.textContent.slice(0, 100));
      el.remove();
    }
  }

  chrome.runtime.sendMessage({ type: "getPatterns" }, (response) => {
    if (!response || !response.patterns) return;
    const patterns = regexListFromStrings(response.patterns);

    // Try to dynamically find a pattern
    let dynamic_pattern = document.getElementsByTagName("html")[0].innerHTML.match(/window\.(\w{30}) = true/);
    console.log(dynamic_pattern);
    if(dynamic_pattern && dynamic_pattern[1]) {
      if(!patterns.some(p => p.test(dynamic_pattern[1])))
      {
        patterns.push(dynamic_pattern[1]);

        // Add to cache in background
        chrome.runtime.sendMessage({ type: "addPatternToCache", pattern: dynamic_pattern[1] });
      }
    }

    // Remove existing scripts
    document.querySelectorAll("script").forEach(el => removeIfSuspect(el, patterns));

    // Watch new scripts
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") {
            removeIfSuspect(node, patterns);
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
})();
