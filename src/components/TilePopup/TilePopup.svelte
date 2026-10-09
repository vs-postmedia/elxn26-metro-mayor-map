<script>
    import './TilePopup.css';

    let { data, onClose } = $props();
    let popupElement = $state();

    let topCandidates = $derived(
        (data?.candidates ?? [])
            .map((candidate) => ({
                name: `${candidate.candidate_first_name} ${candidate.candidate_last_name}`,
                party: candidate.electoral_organization?.electoral_organization_name,
                percent: Number(candidate.vote_percentage) || 0,
                elected: candidate.elected === 'YES'
            }))
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 3)
    );

    function handleOutsideClick(event) {
        if (!popupElement?.contains(event.target)) {
            onClose?.();
        }
    }

    function closePopup(event) {
        event.stopPropagation();
        onClose?.();
    }
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="tile-popup" bind:this={popupElement}>
    <button type="button" class="close-button" aria-label="Close popup" onclick={closePopup}>&times;</button>
    <header>
        <h3>{data.name}</h3>
        <p>Leading candidates in the {data.name} mayors race.</p>
    </header>
    {#if data.acclaimed === 'YES'}
        <div class="label">
            <p class="candidate">
                <span>✅ </span> {topCandidates[0]?.name} (acclaimed)
            </p>
        </div>
    {:else}
        <ul class="results">
            {#each topCandidates as candidate}
                <li>
                    <div class="label">
                        <span class="candidate">
                            {#if candidate.elected}
                                <span>✅ </span>
                            {/if}
                            {candidate.name}</span>
                        {#if candidate.party}
                            <span class="party">{candidate.party}</span>
                        {/if}
                    </div>
                    <div class="bar-row">
                        <div class="bar-track">
                            <div
                                class="bar"
                                class:winner={candidate.elected}
                                style="width: {candidate.percent}%;"
                            ></div>
                        </div>
                        <span class="percent">{candidate.percent}%</span>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
    <div class="footer">
        <p>Find full election results for Metro Vancouver’s <a target="_blank" href="https://vs-postmedia.github.io/local-elxn-results/">mayor, council, school and park board races here</a>.</p>
    </div>
</div>