import { gameWinnigLines } from './lines';
import type { Location } from './location';
import { OxBoard } from './ox-board';

export class OxGame {
	board = new OxBoard();
	player: 'O' | 'X' = 'X';

	#won = false;
	#movesRemaining = 9;

	isWon() {
		return this.#won;
	}

	hasMovesRemaining() {
		return this.#movesRemaining > 0;
	}

	place(location: Location) {
		if (this.board.get(location).type !== 'empty') {
			return;
		}

		this.board.set(location, {
			location: location,
			type: this.player
		});

		this.#won = this.#checkGameWon();
		this.#movesRemaining = this.#checkMovesRemaining();

		if (this.isWon()) {
			console.log('FUCKING WON MATE!');
		} else if (!this.hasMovesRemaining()) {
			console.log('NO MOVES REMAINING');
		} else {
			this.player = this.player === 'O' ? 'X' : 'O';
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

	#checkMovesRemaining() {
		return this.board.cells().filter((cell) => cell.type === 'empty').length;
	}
}
