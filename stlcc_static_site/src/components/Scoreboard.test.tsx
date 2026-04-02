import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Scoreboard } from './Scoreboard';
import type { Player, RoundRecord } from './types';

describe('Scoreboard', () => {
  const players: Player[] = [
    {
      id: '1',
      firstName: 'A',
      lastName: 'Player',
      name: 'A Player',
      rating: 1500,
      score: 1,
    },
    {
      id: '2',
      firstName: 'B',
      lastName: 'Player',
      name: 'B Player',
      rating: 1400,
      score: 0,
    },
  ];

  it('renders empty-state message when there are no rounds', () => {
    render(<Scoreboard rounds={[]} players={players} />);

    expect(screen.getByText('Add files to start.')).toBeInTheDocument();
  });

  it('renders only the rounds passed in', () => {
    const rounds: RoundRecord[] = [
      {
        roundNumber: 1,
        games: [{ whiteId: '1', blackId: '2', result: 'white' }],
      },
      {
        roundNumber: 2,
        games: [{ whiteId: '2', blackId: '1', result: '' }],
      },
      {
        roundNumber: 3,
        games: [{ whiteId: '1', blackId: '2', result: 'draw' }],
      },
    ];

    render(<Scoreboard rounds={rounds} players={players} />);

    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Round 2')).toBeInTheDocument();
    expect(screen.getByText('Round 3')).toBeInTheDocument();
    expect(screen.queryByText('Round 4')).not.toBeInTheDocument();
  });
});
