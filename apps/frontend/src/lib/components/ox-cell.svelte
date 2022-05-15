<script lang="ts">
	import type { OxCellState } from '$lib/game/ox-cell-state';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher<{ cellClick: OxCellState }>();

	export let state: OxCellState;

	function handleClick() {
		dispatcher('cellClick', state);
	}
</script>

<div class="ox-cell" on:click={handleClick}>
	{#if state.type === 'X'}
		<img class="ox" src="pebble/pebble_x_{state.pebble}.png" alt="Cross" />
	{:else if state.type === 'O'}
		<img class="ox" src="pebble/pebble_o_{state.pebble}.png" alt="Naught" />
	{/if}
</div>

<style>
	.ox-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		cursor: pointer;
	}
	.ox {
		width: 80%;
		height: 80%;
	}
</style>
