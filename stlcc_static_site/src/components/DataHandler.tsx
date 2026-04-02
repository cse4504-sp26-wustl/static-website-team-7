import { useEffect } from 'react';
import { applyScores, parsePlayers, parseRounds } from './dataParsing';
import type { Player, RoundRecord } from './types';

interface DataHandlerProps {
  setRounds: React.Dispatch<React.SetStateAction<RoundRecord[]>>;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  dataDirectory: string;
}

export default function DataHandler({ setRounds, setPlayers, dataDirectory }: DataHandlerProps) {
  useEffect(() => {
    let mounted = true;

    async function loadData(): Promise<void> {
      const [players, rounds] = await Promise.all([
        parsePlayers(`${dataDirectory}/players.csv`),
        parseRounds(dataDirectory),
      ]);

      const scoredPlayers = applyScores(players, rounds);
      if (!mounted) {
        return;
      }

      setRounds(rounds);
      setPlayers(scoredPlayers);
    }

    void loadData();

    return () => {
      mounted = false;
    };
  }, [dataDirectory, setPlayers, setRounds]);

  return null;
}
