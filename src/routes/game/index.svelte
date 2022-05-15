<script lang="ts">
	import OxCell from '$lib/components/ox-cell.svelte';
	import type { OxCellState } from '$lib/game/ox-cell-state';
	import { createOxMachine, type Event } from '$lib/game/ox-machine';
	import { map, Observable, Subject, of, delay, pipe } from 'rxjs';
	import { interpret } from 'xstate';

	const cellClicked = new Subject<OxCellState>();
	const playerOneObservable: Observable<Event> = cellClicked.pipe(
		map((value) => ({
			type: 'TURN_COMPLETED',
			location: value.location
		}))
	);

	const machine = createOxMachine({
		getPlayerOneInput: () => playerOneObservable,
		getPlayerTwoInput: (context, event) => {
			const cells: OxCellState[] = context.cells.flat();
			const availableCells = cells.filter((cell) => cell.type === 'empty');
			const selection = Math.floor(Math.random() * availableCells.length);

			return of<Event>({
				type: 'TURN_COMPLETED',
				location: availableCells[selection].location
			}).pipe(delay(500));
		}
	});
	const service = interpret(machine).start();
	service.send('START');
	$: cells = $service.context.cells.flat();
</script>

<div class="ox-container">
	<div class="ox-slate">
		{#each cells as cell}
			<OxCell state={cell} on:cellClick={(event) => cellClicked.next(event.detail)} />
		{/each}
	</div>

	<!-- <h2>
		{#if $ox.isWon()}
			{$ox.currentPlayer().mark} wins!
		{:else if !$ox.hasMovesRemaining()}
			Draw! No moves remaining!
		{:else}
			Player {$ox.currentPlayer().mark}'s turn!
		{/if}
	</h2> -->
	<button on:click={() => service.send('START')}>New Game</button>
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
		background-image: url('/ox_board.png');
		background-size: contain;
	}
</style>
