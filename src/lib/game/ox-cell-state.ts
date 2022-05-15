import type { OxLocation } from './ox-location';

export type OxCellState = OxEmptyCellState | OxPebbleCellState;
export type OxPlayer = 'O' | 'X';
export type OxEmptyCellState = {
	type: 'empty';
	location: OxLocation;
};
export type OxPebbleCellState = {
	type: OxPlayer;
	location: OxLocation;
	pebble: 0 | 1 | 2 | 3 | 4;
};
