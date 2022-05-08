<script lang="ts">
	import OxCell from '$lib/components/ox-cell.svelte';
	import { writable } from 'svelte/store';
	import type { OxCellState } from '$lib/game/ox-cell-state';
	import { OxGame } from '$lib/game/ox-game';

	const ox = writable(new OxGame());

	function handleCellClicked(event: CustomEvent<OxCellState>) {
		ox.update(function (value) {
			value.place(event.detail.location);
			return value;
		});
	}

	function handleNewGameClicked() {
		ox.update(function (value) {
			value.reset();
			return value;
		});
	}
</script>

<div class="ox-container">
	<div class="ox-slate">
		{#each $ox.board.cells() as cell}
			<OxCell state={cell} on:cellClick={handleCellClicked} />
		{/each}
	</div>

	<h2>
		{#if $ox.isWon()}
			{$ox.currentPlayer().mark} wins!
		{:else if !$ox.hasMovesRemaining()}
			Draw! No moves remaining!
		{:else}
			Player {$ox.currentPlayer().mark}'s turn!
		{/if}
	</h2>
	<button on:click={handleNewGameClicked}>New Game</button>
</div>

<style>
	.ox-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.ox-slate {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		width: 512px;
		height: 512px;
		background-image: url('ox_board.png');
		background-size: contain;
	}
</style>
