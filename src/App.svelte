<script>
    // COMPONENTS
    import { onMount } from 'svelte';
    import MetroTileMap from "$components/MetroTileMap/MetroTileMap.svelte";
    import TilePopup from "$components/TilePopup/TilePopup.svelte";
    import { movBins } from './lib/mov-bins.js';

    // DATA
    // TEST CODE
    let currentURL = 0;
    const dataURLs = [
        // 'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2026.json',
        'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/elxn/elxn2026/mayor-map-2026.json',
        'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2022.json'
    ];
    const dataURL = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/elxn/elxn2026/mayor-map-2026.json';

    // VARIABLES
    const refreshInterval = 2; // in minutes
    let data = $state();
    let timestamp = $state();
    let popupId = $state();
    let popupData = $derived((data ?? []).find((tile) => tile.id === popupId));

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
            // if (currentURL === 0) {
            //     currentURL = 1;
            // } else {
            //     currentURL = 0
            // }

            // let json = await fetchData(dataURLs[currentURL]);

            let json = await fetchData(dataURL);
            data = json.data;
            timestamp = json.timestamp;
        }, refreshInterval * 60 * 1000);

        return () => clearInterval(refreshData);
    });
</script>

<header>
    <!-- <h1>Metro’s mayoral races at a glance</h1> -->
    <!-- <p class="subhead">See which candidates are leading their mayoral race and/or their margin of victory.</p> -->
    <p class="timestamp">Last update: {timestamp}</p>
</header>

<main>
    <section class="legend">
        <div class="legend-title">Leading/Margin of Victory (pct. points)</div>
        <div class="legend-bins">
            {#each movBins as bin}
                <div class="legend-bin">
                    <div class="legend-swatch" style="background: {bin.color};"></div>
                    <span>{bin.label}</span>
                </div>
            {/each}
        </div>
        <!-- <p class="legend-caption">Acclaimed municipalities are shown in grey. Tap any city for details.</p> -->
        <p class="note">← Swipe left/right for full results. →
            <br/>Tap city for details. Elected candidates marked with  ✅
        </p>
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
    <!-- <p class="note">NOTE: tk.</p> -->
    <p class="source">Source:  <a href="https://www.civicinfo.bc.ca/election-results" target="_blank">CivicInfo B.C.</a></p>
</footer>
  
<style>
    @import '$css/normalize.css';
    @import '$css/fonts.css';
    @import '$css/colors.css';
    @import '$css/app.css';
</style>
