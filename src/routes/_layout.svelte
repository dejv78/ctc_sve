<!--suppress ES6UnusedImports -->
<script>
	import Nav from '../app/Nav.svelte';

	export let segment;
</script>

<style type="text/scss">
@import 'mixins';

:global(html, body) {
    height: 100vh;
    @include flexed(row, stretch, center);
    @include fill();
}

:global(#sapper) {
    @include flexed(column, stretch, flex-start);
    @include fill();
}

</style>

<Nav {segment}></Nav>

<slot></slot>
