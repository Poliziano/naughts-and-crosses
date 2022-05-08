import type { Location } from './location';

export type OxCellState = {
	type: 'O' | 'X' | 'empty';
	location: Location;
};
