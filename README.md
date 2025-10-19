# VisSt v1.5 — Modular Visualisation System

VisSt is a modular, assistant-powered dashboard for audio-reactive visuals, designed for retail, smart home, and family empowerment. Built with Electron, it features a clean control panel, dynamic visualiser canvas, and plug-and-play VisScript support.

---

## 🧠 Features

- 🎨 Mood and background color control  
- 🎧 Jingle selector and playback  
- 🌀 Tempo and audio source adjustment  
- ⏱️ Timetable trigger logic  
- 🎶 “Now Playing” popup with deck labels  
- 📂 Dynamic table loader for `/visualisers/` folder  
- 🧩 Modular VisScript interpreter (no built-in dropdowns)

---

## 📁 Folder Structure

```
/VisSt/
├── main.js
├── control.html
├── visualiser.html
├── help.html
├── visualisers/ <------ You will need to make this Folder before first use.
│   ├── bloom.js
```

---

## 🚀 How to Run

1. Clone the repo:
   ```
   git clone https://github.com/YOUR_USERNAME/VisSt.git
   cd VisSt
   ```

2. Install dependencies:
   ```
   npm install electron
   ```

3. Launch:
   ```
   npx electron .
   ```

---

## 🧩 Adding New Visualisers

Drop any `.js` file into `/visualisers/` that exports:
```js
module.exports = {
  name: "YourVisualiser",
  init(ctx, canvas) { /* optional */ },
  update(ctx, canvas, audioLevel, color) { /* required */ }
};
```

It will appear instantly in the control panel table.

---

## 📦 Releases

### Stable

- `v1.5` — Now Playing popup, table loader, full control panel

### Pre-release

- [`v1.5.904-beta`](https://github.com/ToedSquire/VisualisationStation/releases/tag/v1.5.904-beta) — VisScript Visualiser Builder, Auto Scan, Built-In Script Runner

---

## 📜 License

MIT — free to remix, share, and empower.
