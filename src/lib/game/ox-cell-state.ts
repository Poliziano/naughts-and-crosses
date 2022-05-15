import type { OxLocation } from './ox-location';

export type OxCellState = {
	type: 'O' | 'X' | 'empty';
	location: OxLocation;
};
