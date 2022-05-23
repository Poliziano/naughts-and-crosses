<script lang="ts">
	import OxCell from '$lib/components/ox-cell.svelte';
	import type { OxCellState } from '$lib/game/ox-cell-state';
	import { createOxMachine, type Context, type Event } from '$lib/game/ox-machine';
	import { delay, map, of, Subject } from 'rxjs';
	import { interpret } from 'xstate';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	const cellClicked = new Subject<OxCellState>();

	const human = () =>
		cellClicked.pipe(
			map<OxCellState, Event>((value) => ({
				type: 'TURN_COMPLETED',
				location: value.location
			}))
		);

	const computer = (context: Context) => {
		const cells: OxCellState[] = context.cells.flat();
		const availableCells = cells.filter((cell) => cell.type === 'empty');
		const selection = Math.floor(Math.random() * availableCells.length);

		return of<Event>({
			type: 'TURN_COMPLETED',
			location: availableCells[selection].location
		}).pipe(delay(500));
	};

	const humanVsComputer = $page.url.searchParams.get('type') === 'computer';

	const machine = createOxMachine({
		playerOneInput: human,
		playerTwoInput: humanVsComputer ? computer : human
	});
	const service = interpret(machine).start();
	service.send('START');
	$: context = $service.context;
	$: cells = $service.context.cells.flat();
</script>

<div class="header" transition:fade>
	<a class="home" href="/"><img src="home.svg" alt="Return Home" /></a>
	<h1>OX Game</h1>
	<button class="new-game" on:click={() => service.send('START')}>New Game</button>
</div>

<div class="ox-container" transition:fade>
	<div class="ox-slate">
		{#each cells as cell}
			<OxCell state={cell} on:cellClick={(event) => cellClicked.next(event.detail)} />
		{/each}
	</div>

	<h2>
		{#if $service.matches({ playing: 'gameWon' })}
			{context.currentPlayer} wins!
		{:else if $service.matches({ playing: 'outOfMoves' })}
			Draw! No moves remaining!
		{:else}
			Player {context.currentPlayer}'s turn!
		{/if}
	</h2>
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
		aspect-ratio: 1;
		width: 100%;
		max-width: 512px;
		background-image: url('/ox_board.png');
		background-size: contain;
	}
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 50px;
		padding: 0 15px;
		box-sizing: border-box;
		background-color: rgba(55, 55, 55, 0.9);
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
	}
	.home {
		display: flex;
		width: 40px;
		height: 40px;
	}
	.new-game {
		padding: 5px;
		border: 2px solid white;
		border-radius: 5px;
		background: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}
</style>
