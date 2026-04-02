import { useMemo, useState } from 'react';
import type { Player } from './types';

interface PlayerListProps {
	players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
	const [query, setQuery] = useState('');

	const sortedPlayers = useMemo(
		() =>
			[...players].sort((a, b) => {
				if (b.score !== a.score) {
					return b.score - a.score;
				}

				return b.rating - a.rating;
			}),
		[players],
	);

	const filteredPlayers = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		if (normalizedQuery === '') {
			return sortedPlayers;
		}

		return sortedPlayers.filter((player) => {
			const combinedName = `${player.firstName} ${player.lastName}`.toLowerCase();
			return combinedName.includes(normalizedQuery) || player.id.includes(normalizedQuery);
		});
	}, [query, sortedPlayers]);

	return (
		<section className="panel leaderboard-panel">
			<h2>Leaderboard</h2>
			<input
				type="text"
				placeholder="Search by player or USCF ID"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Player</th>
						<th>USCF ID</th>
						<th>Score</th>
						<th>Rating</th>
					</tr>
				</thead>
				<tbody>
					{filteredPlayers.length === 0 ? (
						<tr>
							<td colSpan={5}>No players match your search.</td>
						</tr>
					) : (
						filteredPlayers.map((player, index) => (
							<tr key={player.id}>
								<td>{index + 1}</td>
								<td>{player.name}</td>
								<td>{player.id}</td>
								<td>{formatScore(player.score)}</td>
								<td>{player.rating}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</section>
	);
}

function formatScore(score: number): string {
	if (Number.isInteger(score)) {
		return score.toString();
	}

	return score.toFixed(1);
}
