# MMM-UpcomingMovies

A [MagicMirror²](https://magicmirror.builders/) module that displays **upcoming movies** using [The Movie Database (TMDb)](https://www.themoviedb.org/) API. It cycles through posters, titles, release dates, and overviews in a slideshow-style interface.

---

## ✨ Features
- Fetches **upcoming movies** from TMDb.
- Displays **poster, title, release date, and short overview**.
- Automatic **slideshow rotation** between movies.
- Configurable **region**, **update frequency**, and **slideshow speed**.
- Smooth **fade and slide animations**.

---

## 📦 Installation
1. Navigate to your MagicMirror `modules` folder:
   ```bash
   cd ~/MagicMirror/modules
   ```
2. Clone this repository:
   ```bash
   git clone https://github.com/PakshalGada/MMM-UpcomingMovies.git
   ```
3. Install dependencies (if any are listed in `package.json`):
   ```bash
   cd MMM-UpcomingMovies
   npm install
   ```
4. Get a free API key from [The Movie Database](https://www.themoviedb.org/settings/api).

---

## ⚙️ Configuration
Add the module to your MagicMirror `config.js`:

```js
{
  module: "MMM-UpcomingMovies",
  position: "middle_center",   // or any region
  config: {
    apiKey: "YOUR_TMDB_API_KEY",   // Required
    region: "US",                  // Optional: default 'US'
    maxResults: 10,                 // Number of movies to show
    updateInterval: 1000 * 60 * 60, // Refresh every 1 hour
    rotateInterval: 15000           // Switch movie every 15s
  }
}
```

### Options
| Option           | Type    | Default             | Description |
|------------------|--------|---------------------|-------------|
| `apiKey`         | String | `null`              | **Required**. Your TMDb API key. |
| `region`         | String | `"US"`              | Region code (ISO 3166-1). Determines which country’s upcoming movies to fetch. |
| `maxResults`     | Number | `10`                | Max number of movies to keep in rotation. |
| `updateInterval` | Number | `1000*60*60` (1 hr) | Time (ms) between API fetches. |
| `rotateInterval` | Number | `15000` (15 sec)    | Time (ms) before rotating to the next movie. |

---

## 🎨 Styling
This module comes with a CSS file (`MMM-UpcomingMovies.css`):
- Movie posters have a **shadow and hover zoom effect**.
- Text is **centered** with clean spacing.
- **Fade-in** and **slide-in** animations for smooth transitions.

You can override styles in your global `custom.css`.

---

## 🔧 Notes
- Requires an **active internet connection** to fetch data.
- If `apiKey` is missing or invalid, the module will show an error in logs and display no movies.
- If no results are found, you’ll see *“No upcoming movies found.”* on screen.
