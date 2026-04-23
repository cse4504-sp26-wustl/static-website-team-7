# static-website-team-7

Current features implemented:

Automatic data loading from public/data for players and round pairings.
Round detection based on existing pairings_roundX.csv files only, with no extra round headings.
Empty-state handling that shows “Add files to start.” when no round files are found.
ID-to-player matching so each game displays player names instead of raw IDs.
Game result handling for white win, black win, draw, and pending (missing result).
Score calculation from round results and leaderboard sorting by Score (descending), then Rating (descending).
Searchable leaderboard by player name or USCF ID.
Graphical dashboard UI with styled scoreboard cards, result badges, and responsive layout.
Automated tests covering round-file loading behavior and scoreboard rendering.

---

## Tournament Customization Guide

This section is for **tournament organizers** who want to update the website's color scheme or sponsor logos. No programming experience is required.

---

### Changing the Color Scheme

All website colors are controlled by a single file:

```
stlcc_static_site/colors/colors.css
```

Open that file in any text editor (e.g. Notepad on Windows, TextEdit on Mac). You will see a list of color variables and what each one controls:

| Variable | Controls |
|---|---|
| `--color-primary` | Panel headers, leaderboard table header |
| `--color-secondary` | Gradients alongside the primary color |
| `--color-accent` | Draw result badges, decorative borders |
| `--color-text` | Headings and body text |
| `--color-background` | Page background |
| `--color-panel-bg` | Panel / card backgrounds |
| `--color-surface` | Light surface inside panels |
| `--color-border` | Borders around panels and cards |

**How to change a color:**

1. Find the variable you want to change (e.g. `--color-primary`).
2. Replace the value after the colon with your chosen color. For example:
   ```
   --color-primary: #ff0000;
   ```
3. Save the file and reload the website.

**Color formats — you can use either:**

- **Hex** — a `#` followed by 6 characters, e.g. `#ff0000`
- **RGB** — three numbers (0–255) for Red, Green, Blue, e.g. `rgb(255, 0, 0)`

**Common colors for reference:**

| Color | Hex | RGB |
|---|---|---|
| Black | `#000000` | `rgb(0, 0, 0)` |
| White | `#ffffff` | `rgb(255, 255, 255)` |
| Red | `#ff0000` | `rgb(255, 0, 0)` |
| Green | `#008000` | `rgb(0, 128, 0)` |
| Blue | `#0000ff` | `rgb(0, 0, 255)` |

To find the hex or RGB value for any other color, visit **[Google Color Picker](https://www.google.com/search?q=color+picker)** — it shows both formats instantly.

> **Important:** Only change the color *value* (the part after the colon). Do **not** rename the variable names that start with `--color-`.

---

### Adding or Updating Sponsor Logos

Sponsor logos are displayed at the bottom of the website in rows of five. They are loaded automatically from:

```
stlcc_static_site/public/sponsors/
```

**Supported file format:** PNG images (`.png`)

**How to add sponsors:**

1. Name your logo files `sponsor1.png`, `sponsor2.png`, `sponsor3.png`, and so on. The number controls the display order — `sponsor1.png` appears first.
2. Place the files in the `stlcc_static_site/public/sponsors/` directory.
3. Reload the website — the logos will appear automatically in the "Our Sponsors" section.

**How to remove a sponsor:**

Delete the corresponding file from the `public/sponsors/` directory. If a gap is created in the numbering (e.g. `sponsor2.png` is removed but `sponsor3.png` still exists), logos after the gap will not be displayed. Rename the remaining files to keep the numbering consecutive.

**How to hide the sponsors section entirely:**

Remove all `sponsor*.png` files from `public/sponsors/`. The "Our Sponsors" section will not appear when there are no logos present.

> **Note:** There is no maximum limit on the number of sponsor logos.
