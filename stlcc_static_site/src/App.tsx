import { useState } from 'react';
import DataHandler from './components/DataHandler';
import { PlayerList } from './components/PlayerList';
import { Scoreboard } from './components/Scoreboard';
import type { Player, RoundRecord } from './components/types';

import './App.css';

function App() {
  const [rounds, setRounds] = useState<RoundRecord[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Chess Tournament Dashboard</h1>
        <p>Live pairings, game results, and leaderboard rankings</p>
      </header>
      <DataHandler setRounds={setRounds} setPlayers={setPlayers} dataDirectory="/data" />
      <main className="dashboard-grid">
        <PlayerList players={players} />
        <Scoreboard rounds={rounds} players={players} />
      </main>
    </div>
  );
}

export default App;
