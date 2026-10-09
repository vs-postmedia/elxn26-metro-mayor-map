<script>
    // COMPONENTS
    import { onMount } from 'svelte';
    import MetroTileMap from "$components/MetroTileMap/MetroTileMap.svelte";
    import TilePopup from "$components/TilePopup/TilePopup.svelte";

    // DATA
    // TEST CODE
    let currentURL = 0;
    const dataURLs = [
        'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2026.json',
        'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2022.json'
    ];
    // const dataUrl = 'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2026.json';

    // VARIABLES
    const refreshInterval = 0.2; // in minutes
    let data = $state();
    let timestamp = $state();
    let popupId = $state();
    let popupData = $derived((data ?? []).find((tile) => tile.id === popupId));
    const legendLightBlue = '#B9DDF2';
    const legendDarkBlue = '#0062A3';

    let movValues = $derived.by(() => {
        return (data ?? [])
            .map((tile) => Number(tile?.mov))
            .filter((value) => Number.isFinite(value));
    });

    let movRange = $derived.by(() => {
        if (!movValues.length) {
            return { min: null, max: null };
        }

        return {
            min: Math.min(...movValues),
            max: Math.max(...movValues)
        };
    });

    let midMov = $derived.by(() => {
        if (!Number.isFinite(movRange.min) || !Number.isFinite(movRange.max)) {
            return null;
        }

        return (movRange.min + movRange.max) / 2;
    });

    function formatMov(value) {
        if (!Number.isFinite(value)) {
            return '--';
        }

        return `${Math.round(value)} pct. points`;
    }

    async function fetchData(url) {
        const resp = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });

        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
        }

        const json = await resp.json();

        console.log(json)

        return json;
    }



    async function init() {
        // fetch remote data
        let json = await fetchData(dataURLs[0]);
        data = json.data;
        timestamp = json.timestamp;
    }

    onMount(() => {
        init();

        const refreshData = setInterval(async () => {
            if (currentURL === 0) {
                currentURL = 1;
            } else {
                currentURL = 0
            }

            let json = await fetchData(dataURLs[currentURL]);
            data = json.data;
            timestamp = json.timestamp;
        }, refreshInterval * 60 * 1000);

        return () => clearInterval(refreshData);
    });
</script>

<header>
    <h1>Metro Mayors race</h1>
    <p class="subhead">Margin of victory</p>
    <p class="timestamp">Last update: {timestamp}</p>
</header>

<main>
    <section class="legend">
        <div class="legend-title">Leading/Margin of Victory</div>
        <div class="legend-scale-wrap">
            <div
                class="legend-scale"
                style="background: linear-gradient(90deg, {legendLightBlue} 0%, {legendDarkBlue} 100%);"
            ></div>
            <div class="legend-ticks">
                <span>{formatMov(movRange.min)}</span>
                <span>{formatMov(midMov)}</span>
                <span>{formatMov(movRange.max)}</span>
            </div>
        </div>
        <p class="legend-caption">Acclaimed municipalities are shown in grey.</p>
        <p class="note">← Swipe horizontally →</p>
    </section>

    <section class="viewport">
        <MetroTileMap 
                data={data}
                onTileClick={(tile) => (popupId = tile.id)}
            />
        {#if popupData}
            <div class="popup-layer">
                <TilePopup data={popupData} onClose={() => (popupId = undefined)} />
            </div>
        {/if}
    </section>
</main>

<footer>
    <p class="note">NOTE: tk.</p>
    <p class="source">Source:  <a href="https://www.civicinfo.bc.ca/election-results" target="_blank">CivicInfo B.C.</a></p>
</footer>
  
<style>
    @import '$css/normalize.css';
    @import '$css/fonts.css';
    @import '$css/colors.css';
    @import '$css/app.css';
</style>
