import type { Location } from './location';
import type { OxCellState } from './ox-cell-state';

export class OxState {
	/**
	 * 3 by 3 grid.
	 */
	cells: OxCellState[][] = [
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
	];

	get(location: Location): OxCellState {
		return this.cells[location.row][location.column];
	}

	set(location: Location, cell: OxCellState) {
		this.cells[location.row][location.column] = cell;
	}
}
