import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseRounds } from './dataParsing';

describe('parseRounds', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads only existing round CSV files and stops on first missing round', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response('White_USCF_ID,Black_USCF_ID,result\n1,2,white\n', { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response('White_USCF_ID,Black_USCF_ID,result\n2,3,draw\n', { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response('White_USCF_ID,Black_USCF_ID,result\n3,4,black\n', { status: 200 }),
      )
      .mockResolvedValueOnce(new Response('', { status: 404 }));

    const rounds = await parseRounds('/data');

    expect(rounds).toHaveLength(3);
    expect(rounds.map((r) => r.roundNumber)).toEqual([1, 2, 3]);
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it('stops when response is non-pairings content', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response('White_USCF_ID,Black_USCF_ID,result\n1,2,white\n', { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response('<!doctype html><html><body>not csv</body></html>', { status: 200 }),
      );

    const rounds = await parseRounds('/data');

    expect(rounds).toHaveLength(1);
    expect(rounds[0].roundNumber).toBe(1);
  });
});
