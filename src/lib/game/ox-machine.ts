import { createMachine, assign } from 'xstate';
import { gameWinnigLines } from './lines';
import type { OxCellState } from './ox-cell-state';
import type { Location } from './location';
import type { Observable } from 'rxjs';

export type Context = {
	cells: OxCellState[][];
	currentPlayer: 'X' | 'O';
};

export type Event =
	| { type: 'START' }
	| { type: 'TURN_COMPLETED'; location: Location }
	| { type: 'GAME_WON' }
	| { type: 'OUT_OF_MOVES' };

export type PlayerObservable = (context: Context, event: Event) => Observable<Event>;

export function createOxMachine(config: {
	getPlayerOneInput: PlayerObservable;
	getPlayerTwoInput: PlayerObservable;
}) {
	return createMachine<Context, Event>(
		{
			initial: 'stopped',
			context: {
				cells: [],
				currentPlayer: 'X'
			},
			states: {
				stopped: {
					on: {
						START: 'playing'
					}
				},
				playing: {
					initial: 'playerOneTurnBegin',
					entry: ['resetGameState'],
					on: {
						START: {
							target: 'playing'
						}
					},
					states: {
						playerOneTurnBegin: {
							invoke: {
								src: 'waitForPlayerOneMove'
							},
							on: {
								TURN_COMPLETED: {
									target: 'playerOneTurnEnd',
									cond: 'isInputValid',
									actions: ['place']
								}
							}
						},
						playerOneTurnEnd: {
							always: [
								{
									target: 'gameWon',
									cond: 'isGameWon'
								},
								{
									target: 'outOfMoves',
									cond: 'hasNoMovesRemaining'
								},
								{
									target: 'playerTwoTurnBegin',
									actions: ['assignNextPlayer']
								}
							]
						},
						playerTwoTurnBegin: {
							invoke: {
								src: 'waitForPlayerTwoMove'
							},
							on: {
								TURN_COMPLETED: {
									target: 'playerTwoTurnEnd',
									cond: 'isInputValid',
									actions: ['place']
								}
							}
						},
						playerTwoTurnEnd: {
							always: [
								{
									target: 'gameWon',
									cond: 'isGameWon'
								},
								{
									target: 'outOfMoves',
									cond: 'hasNoMovesRemaining'
								},
								{
									target: 'playerOneTurnBegin',
									actions: ['assignNextPlayer']
								}
							]
						},
						gameWon: {},
						outOfMoves: {}
					}
				}
			}
		},
		{
			services: {
				waitForPlayerOneMove: config.getPlayerOneInput,
				waitForPlayerTwoMove: config.getPlayerTwoInput
			},
			actions: {
				resetGameState: assign({
					cells: (_context, _event) => [
						[
							{ type: 'empty', location: { row: 0, column: 0 } },
							{ type: 'empty', location: { row: 0, column: 1 } },
							{ type: 'empty', location: { row: 0, column: 2 } }
						],
						[
							{ type: 'empty', location: { row: 1, column: 0 } },
							{ type: 'empty', location: { row: 1, column: 1 } },
							{ type: 'empty', location: { row: 1, column: 2 } }
						],
						[
							{ type: 'empty', location: { row: 2, column: 0 } },
							{ type: 'empty', location: { row: 2, column: 1 } },
							{ type: 'empty', location: { row: 2, column: 2 } }
						]
					],
					currentPlayer: (_context, _event) => 'X' // (Math.random() > 0.5 ? "X" : "O"),
				}),
				place: assign((context, event) => {
					if (event.type !== 'TURN_COMPLETED') {
						throw new Error('Unexpected state');
					}
					const { currentPlayer, cells } = context;
					const { location } = event;
					console.log(currentPlayer, location);

					cells[location.row][location.column].type = currentPlayer;
					return context;
				}),
				assignNextPlayer: assign((context, event) => ({
					currentPlayer: context.currentPlayer === 'X' ? 'O' : 'X'
				}))
			},
			guards: {
				isInputValid,
				isGameWon,
				hasNoMovesRemaining
			}
		}
	);
}

function isInputValid(context: Context, event: Event): boolean {
	if (event.type !== 'TURN_COMPLETED') {
		throw new Error('Unexpected state');
	}
	const { row, column } = event.location;
	if (row > 2 || row < 0 || column > 2 || column < 0) {
		return false;
	}

	const cell = context.cells[row][column];
	return cell.type === 'empty';
}

function isGameWon(context: Context): boolean {
	for (const locations of gameWinnigLines) {
		const line = locations.map((location) => context.cells[location.row][location.column]);

		if (line.every((cell) => cell.type === 'O')) {
			return true;
		}

		if (line.every((cell) => cell.type === 'X')) {
			return true;
		}
	}

	return false;
}

function hasNoMovesRemaining(context: Context): boolean {
	const cells = context.cells.flat();
	return cells.filter((cell) => cell.type === 'empty').length === 0;
}
