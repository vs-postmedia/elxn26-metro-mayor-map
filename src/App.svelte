<script>
    // COMPONENTS
    import { onMount } from 'svelte';
    import MetroTileMap from "$components/MetroTileMap.svelte";

    // DATA
    // TEST CODE
    let currentURL = 0;
    const dataURLs = [
        'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2026.json',
        'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2026.json'
    ];
    // const dataUrl = 'https://raw.githubusercontent.com/vs-postmedia/civic-info-bc-scraper/refs/heads/master/data/mayor-map-2026.json';

    // VARIABLES
    const refreshInterval = 10; // in minutes
    let data = $state();
    let timestamp = $state();

    async function fetchData(url) {
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
        }

        const json = await resp.json();

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
        <div class="legend-title">Margin of Victory</div>
        <div class="legend-items">
            <div class="legend-item">
            <span class="swatch blue"></span>
            &lt;5%
            </div>
            <div class="legend-item">
            <span class="swatch green"></span>
            5–15%
            </div>
            <div class="legend-item">
            <span class="swatch orange"></span>
            15–30%
            </div>
            <div class="legend-item">
            <span class="swatch purple"></span>
            30%+
            </div>
            <div class="legend-item">
            <span class="swatch grey"></span>
            Acclaimed
            </div>
        </div>
        <div class="note">
        ← Swipe horizontally →
        </div>
    </section>

    <section class="viewport">
        <MetroTileMap 
                data={data}
            />
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

    header {
		margin-bottom: 2rem;
	}
	header > h1 {
		text-align: center;
	}
	header .subhead {
		margin: 0 auto;
		max-width: 525px;
		text-align: center;
	}

    :global(p.timestamp) {
        color: var(--grey03) !important;
        font-family: 'BentonSansCond-RegItalic', italic !important;
        font-size: 1rem;
        margin: 0 auto 2vh 0;
        text-align: center;
    }


    * {
        box-sizing: border-box;
    }

    .legend {
        padding: 12px 20px;
        background: #fafafa;
        border-bottom: 1px solid #ddd;
    }

    .legend-title {
        font-size: 11px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: .08em;
        color: #666;
        margin-bottom: 8px;
    }

    .legend-items {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
    }

    .swatch {
        width: 12px;
        height: 12px;
        border-radius: 3px;
    }

    .note {
        padding: 10px 20px;
        font-size: 13px;
        color: #666;
        border-bottom: 1px solid #ddd;
    }

    .viewport {
        overflow-x: auto;
        padding: 16px;
    }

    .map {
        width: 1040px;
        display: grid;
        grid-template-columns:
        repeat(9, 100px);
        grid-template-rows:
        repeat(6, 100px);
        gap: 12px;
    }

    .tile {
    width: 100px;
    height: 100px;
    border-radius: 16px;
    padding: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
    }

    .city {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .05em;
    opacity: .85;
    }

    .name {
    font-size: 13px;
    font-weight: 700;
    }

    .margin {
    font-size: 22px;
    font-weight: 900;
    line-height: 1;
    }

    /* Classes */
    .blue {
        background: #0f62a5;
    }

    .green {
        background: #148a68;
    }

    .orange {
        background: #d69b18;
    }

    .purple {
        background: #8d4191;
    }

    .deep-purple {
        background: #652b7c;
    }

    .grey {
        background: #6b7280;
    }
</style>
