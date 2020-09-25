<!--suppress ALL -->
<script>
    import { Endpoint, RailEnd } from '../../../model/cells';
    import { shapes, CELL_SIZE } from '../../data/templates';
    export let x;
    export let y;
    export let w;
    export let h;
    export let endpoint;
    export let selected;
    let abs = new Array(w-1);
    
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
  width="{w * CELL_SIZE}px"
  height="{h * CELL_SIZE}px"
  class:selected={selected}>
</rect>

{#if endpoint === Endpoint.RIGHT}
{#each abs as ab, idx}
<polygon
    points="{shapes.get('ab')}"
    class:selected={selected}
    transform="translate({(x * CELL_SIZE) + (idx) * CELL_SIZE})">
</polygon>

<polygon
    points="{shapes.get(RailEnd.SIGNAL_MAIN)[1]}"
    class:selected={selected}
    transform="translate({(x * CELL_SIZE) + (w-1) * CELL_SIZE})">
</polygon>

{/each}

{:else}    
{#each abs as ab, idx}
<polygon
    points="{shapes.get(RailEnd.SIGNAL_MAIN)[0]}"
    class:selected={selected}>
</polygon>

<polygon
    points="{shapes.get('ab')}"
    fill="#777777"
    stroke="#000000"
    stroke-width="1px"
    transform="translate({(x * CELL_SIZE) + (idx + 1) * CELL_SIZE})">
</polygon>
{/each}
{/if}
