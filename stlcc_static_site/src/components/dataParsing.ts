import type { GameRecord, Player, ResultValue, RoundRecord } from './types';

export async function parseRounds(dir: string): Promise<RoundRecord[]> {
  const rounds: RoundRecord[] = [];

  // Round files are named pairings_round1.csv, pairings_round2.csv, ...
  for (let round = 1; round <= 50; round += 1) {
    const response = await fetch(`${dir}/pairings_round${round}.csv`);
    if (!response.ok) {
      break;
    }

    const csvText = await response.text();
    if (!isPairingsCsv(csvText)) {
      break;
    }

    const rows = parseCsv(csvText);
    const games: GameRecord[] = rows
      .map((row) => ({
        whiteId: normalizeValue(row.White_USCF_ID),
        blackId: normalizeValue(row.Black_USCF_ID),
        result: normalizeResult(row.result),
      }))
      .filter((game) => game.whiteId !== '' && game.blackId !== '');

    rounds.push({
      roundNumber: round,
      games,
    });
  }

  return rounds;
}

export async function parsePlayers(path: string): Promise<Player[]> {
  const response = await fetch(path);
  if (!response.ok) {
    return [];
  }

  const csvText = await response.text();
  const rows = parseCsv(csvText);

  return rows
    .map((row) => {
      const id = normalizeValue(row['USCF ID']);
      const firstName = normalizeValue(row['First Name']);
      const lastName = normalizeValue(row['Last Name']);
      const rating = Number.parseInt(normalizeValue(row.Rating), 10);

      return {
        id,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        rating: Number.isNaN(rating) ? 0 : rating,
        score: 0,
      };
    })
    .filter((player) => player.id !== '');
}

export function applyScores(players: Player[], rounds: RoundRecord[]): Player[] {
  const byId = new Map(players.map((player) => [player.id, { ...player }]));

  rounds.forEach((round) => {
    round.games.forEach((game) => {
      const white = byId.get(game.whiteId);
      const black = byId.get(game.blackId);

      if (!white || !black) {
        return;
      }

      if (game.result === 'white') {
        white.score += 1;
      } else if (game.result === 'black') {
        black.score += 1;
      } else if (game.result === 'draw') {
        white.score += 0.5;
        black.score += 0.5;
      }
    });
  });

  return Array.from(byId.values());
}

function parseCsv(csvText: string): Array<Record<string, string>> {
  const lines = csvText
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split(',').map((header) => header.trim());
  const rows: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i += 1) {
    const cols = lines[i].split(',');
    const row: Record<string, string> = {};

    headers.forEach((header, idx) => {
      if (header !== '') {
        row[header] = (cols[idx] ?? '').trim();
      }
    });

    rows.push(row);
  }

  return rows;
}

function normalizeValue(value: string | undefined): string {
  return (value ?? '').trim();
}

function normalizeResult(value: string | undefined): ResultValue {
  const normalized = (value ?? '').trim().toLowerCase();

  if (normalized === 'white' || normalized === 'black' || normalized === 'draw') {
    return normalized;
  }

  return '';
}

function isPairingsCsv(csvText: string): boolean {
  const firstLine = csvText.split(/\r?\n/u)[0]?.trim() ?? '';
  return firstLine.includes('White_USCF_ID') && firstLine.includes('Black_USCF_ID');
}
