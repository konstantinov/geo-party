<script>

import { buildIcon } from '~/../utils/ui';
import { createEventDispatcher } from 'svelte';
    export let leftIcon;
    export let rightIcon;

    const dispatch = createEventDispatcher();


</script>

<div class="Input">
    {#if leftIcon}<i class="{buildIcon(leftIcon)}" on:click={() => dispatch('iconClick', { icon: 'left' })}></i>{/if}
    <input type="text" />
    {#if rightIcon}<i class="{buildIcon(rightIcon)}" on:click={() => dispatch('iconClick', { icon: 'right' })}></i>{/if}
</div>

<style>
    input {
        padding: 0;
        margin: 0;
        border: 0;
        outline: none;
        flex: 1;
        background: transparent;
        color: #999;
    }
    i { color: #999; cursor: pointer }
    i:hover { color: #333 }
    .Input {
        display: flex;
        gap: 12px;
        flex-flow: row nowrap;
        align-items: center;
        height: 36px;
        border-radius: 18px;
        background: #fff;
        padding: 0 12px;
        border: 1px solid #999;
    }
</style>