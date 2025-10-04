## bTV Canceller

A Chrome extension to block unwanted JavaScript on **btv.bg** by removing scripts and variables that match patterns from a remote list.

---

### 🚀 What It Does

- **Blocks suspect scripts** before they run, using patterns you control.
- **Fetches regex patterns** from a GitHub JSON file for easy updates.
- **Removes both inline and external scripts** matching your patterns.
- **Watches for new scripts** added dynamically and removes them in real time.
- **Cleans up global variables** that match your patterns, even after page load.
- **Works out of the box** with a default pattern if the remote list is unavailable.

---

### 🗂️ Project Structure

```
/
├── manifest.json         # Chrome extension manifest (MV3)
├── background.js         # Loads pattern list from GitHub (with fallback)
├── removeScripts.js      # Content script: removes matching <script> tags
├── injectCleaner.js      # Injects variable cleaner into the page
├── pageCleaner.js        # Cleans up global variables matching patterns
└── suspect-patterns.json # Example pattern list (hosted on GitHub)
```

---

### ⚙️ How to Use

1. **Clone or download** this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select this project folder.
5. Visit [btv.bg](https://btv.bg) — suspect scripts and variables will be blocked automatically.

---

### 📝 Customizing Patterns

- Edit the `suspect-patterns.json` file in your GitHub repo to add or remove regex patterns.
- The extension will fetch the latest list automatically.
- If the remote list is unavailable, a default pattern is used.

---

### 📄 License

MIT License — free to use, modify, and share.