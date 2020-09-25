<!--suppress ALL -->
<script>
    import { Endpoint, RailEnd, SegmentDir } from '../../../model/cells';
    import { shapes, CELL_SIZE } from '../../data/templates';
    export let x;
    export let y;
    export let w;
    export let endLeft;
    export let endRight;
    export let selected;
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
  height="{CELL_SIZE}px"
  class:selected={selected}
  transform="translate({x * CELL_SIZE}, {y * CELL_SIZE})">
</rect>

<polygon
    points="{shapes.get(SegmentDir.HORIZONTAL)}"
    stroke-width="1px"
    class:selected={selected}
    transform="translate({(x * CELL_SIZE) + CELL_SIZE})">
</polygon>

<polygon
    points="{shapes.get(endLeft)[0]}"
    class:selected={selected}
    transform="translate({x * CELL_SIZE})">
</polygon>

<polygon
    points="{shapes.get(endRight)[1]}"
    class:selected={selected}
    transform="translate({(x * CELL_SIZE) + (w - 1) * CELL_SIZE})">
</polygon>

