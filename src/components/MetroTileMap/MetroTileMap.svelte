<script>
    import './MetroTileMap.css';
    import { onMount } from 'svelte';
    import { extent } from 'd3-array';
    import { scaleLinear } from 'd3-scale';

    // COMPONENTS
    import Tile from '$components/Tile/Tile.svelte';
    import backgroundImage from '$images/background-silhouette.jpg';

    let { data = [], onTileClick } = $props();

    // VARS
    const lightBlue = '#B9DDF2';
    const darkBlue = '#0062A3';
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

    let movExtent = $derived.by(() => {
        const values = data
            .map((tile) => Number(tile?.mov))
            .filter((value) => Number.isFinite(value));

        return extent(values);
    });

    let colorScale = $derived.by(() => {
        const [minMov, maxMov] = movExtent;

        if (!Number.isFinite(minMov) || !Number.isFinite(maxMov)) {
            return null;
        }

        // Avoid a zero-width domain when all MOV values are identical.
        const domainMax = minMov === maxMov ? minMov + 1 : maxMov;

        return scaleLinear()
            .domain([minMov, domainMax])
            .range([lightBlue, darkBlue])
            .clamp(true);
    });

    function getTileColor(tile) {
        if (tile?.acclaimed === 'YES') {
            return acclaimedGrey;
        }

        const mov = Number(tile?.mov);
        if (!Number.isFinite(mov) || !colorScale) {
            return lightBlue;
        }

        return colorScale(mov);
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
