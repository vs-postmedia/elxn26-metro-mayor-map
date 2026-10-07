<script>
  import './Tile.css';

  let { acclaimed, candidateName, cityName, elected, mov, tileColor = '#B9DDF2', onclick } = $props();

  let nameClass = $derived((cityName ?? '').toLowerCase().replace(/\s+/g, '-'));
  let displayCityName = $derived.by(() => {
    if (cityName === 'North Vancouver City' || cityName === 'North Vancvouer City') {
      return 'North Van. (C)';
    }

    if (cityName === 'North Vancouver District') {
      return 'North Van. (D)';
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
            {#if acclaimed === 'YES' || elected == 'YES'}
                <span class='subtitle'>✅</span>
            {/if}
            {candidateName}
        </div>
    </div>
    <div class="margin">
         {#if acclaimed === 'YES'}
            <span class='acclaimed'>Acclaimed</span>
        {:else}
            +{mov}
        {/if}
    </div>
</button>
