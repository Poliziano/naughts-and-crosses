<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="menu" transition:fade>
	<a href="/game?type=computer">
		<img class="button" src="ox_vs_computer.png" alt="vs computer" />
	</a>
	<a href="/game?type=local">
		<img class="button" src="ox_vs_local.png" alt="vs local" />
	</a>
</div>

<style>
	.menu {
		display: flex;
		position: absolute;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		gap: 25px;
	}
	.button {
		height: 150px;
	}
</style>
