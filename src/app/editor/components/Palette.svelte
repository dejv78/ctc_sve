<!--suppress ALL -->
<script>
    import {templates} from '../../common/data/templates';
    import {selectedCell} from '../editor-logic';
    import PaletteCell from './PaletteCell.svelte';

    let swatches = [
        [templates.track_basic_h, templates.track_basic_v, templates.track_basic_rb, templates.track_basic_lt, templates.track_basic_rt, templates.track_basic_lb],
        [templates.track_junction_lrb, templates.track_junction_lrt, templates.track_junction_rb, templates.track_junction_lt, templates.track_junction_rt, templates.track_junction_lb],
        [templates.track_rail, templates.track_autoblock],
    ]

    function handleSelectCell(event) {
        selectedCell.set(event.detail);
    }
</script>

<style type="text/scss">

    @import "mixins";
    @import "variables";

    .palette {
        width: 300px;
        padding: 0 20px;
        @include flexed(column nowrap, flex-start, flex-start);
        background-color: $color-bkg-lighter;
        border-left: 1px solid $color-border-dark;
    }

    .row {
        padding: 10px 0;
        @include flexed(row nowrap, flex-start, center);
    }
</style>

<div class="palette">
  {#each swatches as row}
      <div class="row">
        {#each row as cell}
            <PaletteCell cell={cell} on:select={handleSelectCell}></PaletteCell>
        {/each}
      </div>
  {/each}
</div>
