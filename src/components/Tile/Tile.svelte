<script>
  import './Tile.css';

  let { acclaimed, candidateName, cityName, elected, mov, tileColor = '#A7A9AB', onclick } = $props();

  let nameClass = $derived((cityName ?? '').toLowerCase().replace(/\s+/g, '-'));
  let awaitingResults = $derived(acclaimed !== 'YES' && mov != null && Number(mov) === 0);
  let displayCityName = $derived.by(() => {
    if (cityName === 'North Vancouver City' || cityName === 'North Vancvouer City') {
      return 'North Van. (C)';
    }
    if (cityName === 'North Vancouver District') {
      return 'North Van. (D)';
    }
    if (cityName === 'West Vancouver') {
      return 'West Van.)';
    }

    return cityName;
  });

</script>

<button
  type="button"
  class="tile {nameClass}"
  style="background-color: {tileColor};"
  onclick={(event) => onclick?.(event)}
>
    <div>
        <div class="city">{displayCityName}</div>
        <div class="name">
            {#if awaitingResults}
                Awaiting results
            {:else}
                {#if acclaimed === 'YES' || elected === 'YES'}
                    <span class='check'>✅</span>
                {/if}
                {candidateName}
            {/if}
        </div>
    </div>
    <div class="margin">
         {#if acclaimed === 'YES'}
            <span class='acclaimed'>Acclaimed</span>
        {:else if !awaitingResults}
            +{mov} 
            {#if elected == 'YES'}
              <span class='lead'>won</span>
            {:else}
              <span class='lead'>lead</span>
            {/if}
        {/if}
    </div>
</button>
