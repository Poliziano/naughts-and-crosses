import { gameWinnigLines } from './lines';
import type { Location } from './location';
import { OxBoard } from './ox-board';

export class OxGame {
	board = new OxBoard();
	player: 'O' | 'X' = 'X';

	place(location: Location) {
		this.board.set(location, {
			location: location,
			type: this.player
		});

		this.player = this.player === 'O' ? 'X' : 'O';

		if (this.#checkGameWon()) {
			console.log('FUCKING WON MATE!');
		}
	}

	#checkGameWon() {
		for (const locations of gameWinnigLines) {
			const line = locations.map((location) => this.board.get(location));

			if (line.every((cell) => cell.type === 'O')) {
				return true;
			}

			if (line.every((cell) => cell.type === 'X')) {
				return true;
			}
		}

		return false;
	}
}
