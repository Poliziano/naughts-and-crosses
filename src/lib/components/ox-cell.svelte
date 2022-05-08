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
		X
	{:else if state.type === 'O'}
		<img class="ox" src="O_1.png" alt="Naught" />
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
		width: 50%;
		height: 50%;
	}
</style>
