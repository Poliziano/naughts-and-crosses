import type { OxLocation } from './ox-location';

export const gameWinnigLines: OxLocation[][] = [
	// Horizontals
	[
		{ row: 0, column: 0 },
		{ row: 0, column: 1 },
		{ row: 0, column: 2 }
	],
	[
		{ row: 1, column: 0 },
		{ row: 1, column: 1 },
		{ row: 1, column: 2 }
	],
	[
		{ row: 2, column: 0 },
		{ row: 2, column: 1 },
		{ row: 2, column: 2 }
	],

	// Verticals
	[
		{ row: 0, column: 0 },
		{ row: 1, column: 0 },
		{ row: 2, column: 0 }
	],
	[
		{ row: 0, column: 1 },
		{ row: 1, column: 1 },
		{ row: 2, column: 1 }
	],
	[
		{ row: 0, column: 2 },
		{ row: 1, column: 2 },
		{ row: 2, column: 2 }
	],

	// Diagonals
	[
		{ row: 0, column: 0 },
		{ row: 1, column: 1 },
		{ row: 2, column: 2 }
	],
	[
		{ row: 0, column: 2 },
		{ row: 1, column: 1 },
		{ row: 2, column: 0 }
	]
];
