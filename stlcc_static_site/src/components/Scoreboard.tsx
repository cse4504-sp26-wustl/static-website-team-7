import { Round } from './Round';
import type { Player, RoundRecord } from './types';

interface ScoreboardProps {
  rounds: RoundRecord[];
  players: Player[];
}

export function Scoreboard({ rounds, players }: ScoreboardProps) {
  const playersById = new Map(players.map((player) => [player.id, player]));

  if (rounds.length === 0) {
    return (
      <section className="panel scoreboard-panel">
        <h2>Scoreboard</h2>
        <p className="empty-state">Add files to start.</p>
      </section>
    );
  }

  return (
    <section className="panel scoreboard-panel">
      <h2>Scoreboard</h2>
      <div className="rounds-grid">
        {rounds.map((round) => (
          <Round key={round.roundNumber} round={round} playersById={playersById} />
        ))}
      </div>
    </section>
  );
}
