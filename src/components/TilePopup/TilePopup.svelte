<script>
    import './TilePopup.css';

    let { data, width, onClose } = $props();
    let popupWidth = $state();
    let popupElement = $state();
    const xNudge = 5;
    const yNudge = 5;

    let xPosition = $derived(
        (data?.x ?? 0) + (popupWidth ?? 0) + xNudge > width
            ? (data?.x ?? 0) - (popupWidth ?? 0) - xNudge
            : (data?.x ?? 0) + xNudge
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

<div
    class="tile-popup"
    bind:this={popupElement}
    bind:clientWidth={popupWidth}
    style="left: {xPosition}px; top: {data.y + yNudge}px;"
>
    <button type="button" class="close-button" aria-label="Close popup" onclick={closePopup}>&times;</button>
    <h3>{data.name}</h3>
    <p>{data.lead_name}</p>
    {#if data.acclaimed === 'YES'}
        <p>Acclaimed</p>
    {:else if data.mov != null}
        <p>Margin of victory: +{data.mov}</p>
    {/if}
</div>