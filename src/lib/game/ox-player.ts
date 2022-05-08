import type { OxGame } from './ox-game';

export interface OxPlayer {
	mark: 'X' | 'O';
	beginTurn(ox: OxGame): void;
}

export class OxHumanPlayer implements OxPlayer {
	mark: 'X' | 'O';

	constructor(mark: 'X' | 'O') {
		this.mark = mark;
	}

	beginTurn(): void {
		// Human player does their own thing.
	}
}

export class OxComputerPlayer implements OxPlayer {
	mark: 'X' | 'O';

	constructor(mark: 'X' | 'O') {
		this.mark = mark;
	}

	beginTurn(ox: OxGame): void {
		const cells = ox.board.cells();
		const availableCells = cells.filter((cell) => cell.type === 'empty');

		const selection = Math.floor(Math.random() * availableCells.length);
		ox.place(availableCells[selection].location);
	}
}
