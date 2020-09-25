<!--suppress ALL -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { Endpoint, SegmentDir } from '../../../model/cells';
    import { shapes, CELL_SIZE } from '../../data/templates';
    export let x;
    export let y;
    export let segments;
    export let selected;

    const dispatch = createEventDispatcher();
</script>

<style type="text/scss">
    @import "variables";
    
    rect {
        fill: $color-bkg-darker;
        &.selected {
            fill: $color-primary;
        }
    }
    
    polygon {
        fill: $color-front;
        stroke: $color-bkg-darker;
        &.selected {
            fill: $color-bkg-darker;
            stroke: $color-primary;
        }
    }
</style>

<rect 
        width="{CELL_SIZE}px"
        height="{CELL_SIZE}px"
        class:selected={selected}
        transform="translate({x * CELL_SIZE}, {y * CELL_SIZE})">
</rect>

{#if segments}
  {#each segments as segment}
      <polygon
              points="{shapes.get(segment.dir)}"
              class:selected={selected}
              stroke-width="1px"
              transform="translate({x * CELL_SIZE}, {y * CELL_SIZE})">
      </polygon>
  {/each}
{/if}
