<script>
	export let rightSidebarOpened = true;
</script>

<div class="SplitLayoyt container">
	<div class="content" class:fullwidth={!rightSidebarOpened}>
		<slot name="content" />
	</div>
	{#if rightSidebarOpened}
		<div class="right-sidebar">
			<slot name="rightSidebar" />
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-flow: row nowrap;
	}
	.content {
		flex: 50% 0 0;
		max-width: 600px;
	}
	.right-sidebar {
		flex: 50% 1 1;
	}
	.content.fullwidth {
		flex: 100% 0 0;
	}
</style>
