import type { GameRecord, Player } from './types';

interface GameProps {
	game: GameRecord;
	playersById: Map<string, Player>;
}

export function Game({ game, playersById }: GameProps) {
	const whitePlayer = playersById.get(game.whiteId);
	const blackPlayer = playersById.get(game.blackId);
	const hasResult = game.result !== '';

	return (
		<div className="game-row">
			<div className="game-players">
				<span className="player-chip white-chip">{whitePlayer?.name ?? game.whiteId}</span>
				<span className="vs-pill">vs</span>
				<span className="player-chip black-chip">{blackPlayer?.name ?? game.blackId}</span>
			</div>
			<span className={`result-pill ${hasResult ? game.result : 'pending'}`}>
				{hasResult ? formatResult(game.result) : 'Pending'}
			</span>
		</div>
	);
}

function formatResult(result: GameRecord['result']): string {
	if (result === 'white') {
		return 'White won';
	}

	if (result === 'black') {
		return 'Black won';
	}

	return 'Draw';
}
