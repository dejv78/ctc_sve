<script>
	export let segment;
</script>

<style type="text/scss">

	@import "variables";
	
	nav {
		border-bottom: 1px solid $color-bkg-darker;
		font-weight: 300;
		padding: 0 1em;
		background-color: #263238;
		color: #B0BEC5;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #00BCD4;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>editor</a></li>
		<li><a class='{segment === "game" ? "selected" : ""}' href='game'>game</a></li>
	</ul>
</nav>