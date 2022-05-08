<script lang="ts">
	import type { OxCellState } from '$lib/data/ox-cell-state';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher<{ cellClick: OxCellState }>();

	export let state: OxCellState;

	function handleClick() {
		dispatcher('cellClick', state);
	}
</script>

<div class="ox-cell" on:click={handleClick}>
	{state.type.toString().toUpperCase()}
</div>

<style>
	.ox-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		cursor: pointer;
	}
</style>
