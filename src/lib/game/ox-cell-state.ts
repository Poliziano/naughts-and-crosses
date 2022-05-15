import type { OxLocation } from './ox-location';

export type OxCellState = OxEmptyCellState | OxPebbleCellState;

export type OxEmptyCellState = {
	type: 'empty';
	location: OxLocation;
};

export type OxPebbleCellState = {
	type: 'O' | 'X';
	location: OxLocation;
	pebble: 0 | 1 | 2 | 3 | 4;
};
