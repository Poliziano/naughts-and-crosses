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
	}
}
