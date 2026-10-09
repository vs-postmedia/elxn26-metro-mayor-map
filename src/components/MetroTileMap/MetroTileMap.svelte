<script>
    import './MetroTileMap.css';
    import { onMount } from 'svelte';
    import { getBinColor } from '../../lib/mov-bins.js';

    // COMPONENTS
    import Tile from '$components/Tile/Tile.svelte';
    import backgroundImage from '$images/background-silhouette.jpg';

    let { data = [], onTileClick } = $props();

    // VARS
    const acclaimedGrey = '#6b7280';

    const margin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20 
	};

    $effect(() => {
        // $inspect(data);
    });

    function getTileColor(tile) {
        if (tile?.acclaimed === 'YES') {
            return acclaimedGrey;
        }

        return getBinColor(Number(tile?.mov));
    }

    function handleTileClick(tile, event) {
        event.stopPropagation();
        onTileClick?.(tile);
    }

    // FUNCTIONS
    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
</script>

<div class="map-wrapper">
    <div class="map-bg" style="background-image: url('{backgroundImage}');"></div>
    <div class="map">
        {#each data as tile (tile.id)}
            <Tile
                acclaimed={tile.acclaimed}
                candidateName={tile.lead_name}
                cityName={tile.name}
                elected={tile.elected}
                mov={tile.mov}
                tileColor={getTileColor(tile)}
                onclick={(event) => handleTileClick(tile, event)}
            />
        {/each}
    </div>
</div>
