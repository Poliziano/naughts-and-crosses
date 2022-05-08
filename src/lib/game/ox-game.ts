import { gameWinnigLines } from './lines';
import type { Location } from './location';
import { OxBoard } from './ox-board';
import { OxHumanPlayer, type OxPlayer } from './ox-player';

export class OxGame {
	board = new OxBoard();

	#players: OxPlayer[] = [new OxHumanPlayer('X'), new OxHumanPlayer('O')];
	#playerIndex = 0;

	#won = false;
	#movesRemaining = 9;

	isWon() {
		return this.#won;
	}

	hasMovesRemaining() {
		return this.#movesRemaining > 0;
	}

	place(location: Location) {
		if (this.isWon() || !this.hasMovesRemaining() || this.board.get(location).type !== 'empty') {
			return;
		}

		this.board.set(location, {
			location: location,
			type: this.currentPlayer().mark
		});

		this.#won = this.#checkGameWon();
		this.#movesRemaining = this.#checkMovesRemaining();

		if (this.isWon()) {
			console.log('FUCKING WON MATE!');
		} else if (!this.hasMovesRemaining()) {
			console.log('NO MOVES REMAINING');
		} else {
			this.#nextPlayer().beginTurn(this);
		}
	}

	reset() {
		this.board = new OxBoard();
		this.#playerIndex = 0;
		this.#won = false;
		this.#movesRemaining = 9;
	}

	currentPlayer(): OxPlayer {
		return this.#players[this.#playerIndex];
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

	#nextPlayer(): OxPlayer {
		this.#playerIndex = this.#playerIndex === 0 ? 1 : 0;
		return this.#players[this.#playerIndex];
	}
}