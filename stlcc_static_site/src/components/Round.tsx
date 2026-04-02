import { Game } from './Game';
import type { Player, RoundRecord } from './types';

interface RoundProps {
	round: RoundRecord;
	playersById: Map<string, Player>;
}

export function Round({ round, playersById }: RoundProps) {
	return (
		<section className="round-card">
			<h3>{`Round ${round.roundNumber}`}</h3>
			<div className="round-games">
				{round.games.map((game) => (
					<Game
						key={`${round.roundNumber}-${game.whiteId}-${game.blackId}`}
						game={game}
						playersById={playersById}
					/>
				))}
			</div>
		</section>
	);
}
