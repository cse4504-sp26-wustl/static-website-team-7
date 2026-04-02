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