<script lang="ts">
	import OxCell from '$lib/components/ox-cell.svelte';
	import type { OxCellState } from '$lib/data/ox-cell-state';
	import { OxState } from '$lib/data/ox-state';
	import { writable } from 'svelte/store';

	const ox = writable(new OxState());

	function handleCellClicked(event: CustomEvent<OxCellState>) {
		ox.update(function (value) {
			value.set(event.detail.location, {
				location: event.detail.location,
				type: 'X'
			});
			return value;
		});
	}
</script>

<div class="ox-slate">
	<OxCell state={$ox.get({ row: 0, column: 0 })} on:cellClick={handleCellClicked} />
	<OxCell state={$ox.get({ row: 0, column: 1 })} on:cellClick={handleCellClicked} />
	<OxCell state={$ox.get({ row: 0, column: 2 })} on:cellClick={handleCellClicked} />

	<OxCell state={$ox.get({ row: 1, column: 0 })} on:cellClick={handleCellClicked} />
	<OxCell state={$ox.get({ row: 1, column: 1 })} on:cellClick={handleCellClicked} />
	<OxCell state={$ox.get({ row: 1, column: 2 })} on:cellClick={handleCellClicked} />

	<OxCell state={$ox.get({ row: 2, column: 0 })} on:cellClick={handleCellClicked} />
	<OxCell state={$ox.get({ row: 2, column: 1 })} on:cellClick={handleCellClicked} />
	<OxCell state={$ox.get({ row: 2, column: 2 })} on:cellClick={handleCellClicked} />
</div>

<style>
	.ox-slate {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		width: 500px;
		height: 500px;
		background-color: slategray;
	}
</style>
