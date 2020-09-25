<!--suppress ALL -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { selectedCell } from '../editor-logic';
    import { RailEnd, Endpoint } from '../../model/cells';
    import {CELL_SIZE} from '../../common/data/templates';
    import TrackCell from '../../common/components/cells/TrackCell.svelte';
   	import RailCell from '../../common/components/cells/RailCell.svelte';
   	import AutoblockCell from '../../common/components/cells/AutoblockCell.svelte';

    export let cell;
    let w = 1;
    let type = 'basic';
    switch (cell.code) {
      case 'track_rail': {
        w = 3;
        type = 'rail';
        break;
      }
      case 'track_autoblock': {
        w = 3;
        type = 'autoblock';
        break;
      }
    }

    const dispatch = createEventDispatcher();
    
</script>

<style type="text/scss">
    @import 'mixins';
    @import 'variables';
    
    figure {
        @include radius(5px);
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        margin: 0;
        border: 1px solid $color-border-dark;
        overflow: hidden;
        
        &.wide {
            width: 150px;
        }
    }
</style>

<figure class:wide="{w > 1}">
<svg
    viewBox="0 0 {w * CELL_SIZE} {CELL_SIZE}"
    preserveAspectRatio="xMidYMid meet"
    version="1.1"
    on:click="{() => dispatch('select', cell)}"
    xmlns="http://www.w3.org/2000/svg">
    
{#if type === 'basic'}
    <TrackCell x={0} y={0} segments="{cell.segments}" selected="{$selectedCell && ($selectedCell.code === cell.code)}"></TrackCell>
{:else if type === 'rail'}    
    <RailCell x={0} y={0} w={w} endLeft={RailEnd.SIGNAL_SHUNT} endRight={RailEnd.SIGNAL_SHUNT} segments="{cell.segments}" selected="{$selectedCell && ($selectedCell.code === cell.code)}"></RailCell>
{:else}    
    <AutoblockCell x={0} y={0} w={w} h={1} endpoint="{Endpoint.RIGHT}" selected="{$selectedCell && ($selectedCell.code === cell.code)}"></AutoblockCell>
{/if}

</svg>
</figure>
