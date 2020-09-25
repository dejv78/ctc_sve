<!--suppress ALL -->
<script>
    import {onMount} from "svelte";
    import {CELL_SIZE} from '../../common/data/templates';
    import {Plan} from '../../model/plan';
    import {selectedCell} from '../editor-logic';
    import Palette from "./Palette.svelte";
    import TrackCell from '../../common/components/cells/TrackCell.svelte';
    import RailCell from '../../common/components/cells/RailCell.svelte';
    import AutoblockCell from '../../common/components/cells/AutoblockCell.svelte';

    let width = 60;
    let height = 30;
    let elements = {};
    let state = [];
    let inc = 0;
    let plan = new Plan('Pokus', width, height);
    let grid = plan.grid;
    let area = null;

    for (let i = 0; i < height; i++) {
        const sr = [];
        for (let j = 0; j < width; j++) {
            sr.push({hovered: false});
        }
        state.push(sr);
    }


    onMount(async () => {
//        const p = [];
    });

    function handleMouseEnter(i, j) {
        state[j][i].hovered = true && !area;
        state = state;
    }

    function handleMouseExit(i, j) {
        state[j][i].hovered = false;
        state = state;
    }

    function handleMouseDown(x, y) {
        let sc = $selectedCell;
        if (sc) {
            if (sc.sizeConstraints) {
                if (!area) {
                    area = {x: x, y: y, w: 1, h: 1, c: sc.sizeConstraints, valid: false};
                }
            } else {
                plan.addCell(sc, x, y, 1, 1);
                grid = plan.grid;
            }
        }
    }

    function handleMouseMove(x, y) {
        if (area) {
            area.w = x - area.x + 1;
            area.h = y - area.y + 1;
            area.valid = (area.w >= area.c.minWidth) && (area.w <= area.c.maxWidth) && (area.h === area.c.height)
        }
    }

    function handleMouseUp(x, y) {
        if (area) {
            if (area.valid) {
                let sc = $selectedCell;
                plan.addCell(sc, area.x, area.y, area.w, area.h);
            }
            area = null;
        }
    }

    function handleContext(i, j) {
        console.log('Context');
    }


</script>

<style type="text/scss">
    @import "mixins";
    @import "variables";

    .content {
        @include fill();
        @include flexed(row, stretch, center);
        max-width: 100vw;
        overflow: hidden;
    }

    .editor {
        @include fill();
        @include flexed(row, center, center);
        background-color: $color-bkg-darker;
        color: white;
        overflow: auto;
    }

    figure {
        margin: 0;
        background-color: $color-bkg-lighter;
        border: 1px solid $color-border-dark;
    }

    rect {
        fill: transparent;
        stroke: $color-border-transparent;

        &.selected {
            fill: $color-primary-transparent;
        }

        &.area {
            fill: $color-accent-transparent;

            &.valid {
                fill: $color-primary-transparent;
            }
        }
    }
</style>

<div class="content">
    <div class="editor">
        <figure style="min-width: {width * CELL_SIZE}px; width: {width * CELL_SIZE}px; min-height: {height * CELL_SIZE}px; height: {height * CELL_SIZE}px">
            <svg
                    viewBox="0 0 {width * CELL_SIZE} {height * CELL_SIZE}"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">

              {#each grid as row, j}
                {#each row as cell, i}
                  {#if cell}
                    {#if cell.code === 'track_rail'}
                      {#if (i === plan.elements[cell].x) && (j === plan.elements[cell].y)}
                        <RailCell x={i} y={j} w={plan.elements[cell].w} h={plan.elements[cell].h} segments="{plan.elements[cell].segments}" selected="{false}"></RailCell>
                      {/if}
                    {:else if cell.code === 'track_autoblock'}
                      {#if (i === plan.elements[cell].x) && (j === plan.elements[cell].y)}
                        <AutoblockCell x={i} y={j} w={plan.elements[cell].w} h={plan.elements[cell].h} segments="{plan.elements[cell].segments}" selected="{false}"></AutoblockCell>
                      {/if}
                    {:else}
                      <TrackCell x={i} y={j} segments="{plan.elements[cell].segments}" selected="{false}"></TrackCell>
                    {/if}
              {/if}
                    <rect
                            x="{i * CELL_SIZE}px"
                            y="{j * CELL_SIZE}px"
                            width="{CELL_SIZE}px"
                            height="{CELL_SIZE}px"
                            stroke-width="1px"
                            class:selected={state[j][i].hovered}
                            on:mouseenter="{() => handleMouseEnter(i, j)}"
                            on:mouseleave="{() => handleMouseExit(i, j)}"
                            on:mousedown="{() => handleMouseDown(i, j)}"
                            on:mousemove="{() => handleMouseMove(i, j)}"
                            on:mouseup="{() => handleMouseUp(i, j)}"
                            on:contextmenu|preventDefault="{() => handleContext(i, j)}"/>
              {/each}
            {/each}
            {#if area}
                <rect
                        x="{area.x * CELL_SIZE}px"
                        y="{area.y * CELL_SIZE}px"
                        width="{area.w * CELL_SIZE}px"
                        height="{area.h * CELL_SIZE}px"
                        class="area"
                        class:valid={area.valid}
                        pointer-events="none"/>
            {/if}
            </svg>
        </figure>
    </div>
    <Palette/>
</div>
