<script>
  let { acclaimed, candidateName, cityName, elected, mov, tileColor = '#B9DDF2' } = $props();

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

    // console.log('TILE')
    // console.log(candidateName, cityName, elected, mov )
</script>

<div class="tile {nameClass}" style="background-color: {tileColor};">
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
</div>

<style>
.tile {
  width: 90px;
  height: 90px;
  border-radius: 16px;
  padding: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  font-family: 'BentonSansCond-Regular', sans-serif;
}

.city {
  font-size: 0.8rem;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: .05em;
  line-height: 1.15;
  opacity: .85;
  text-shadow: 0 1px 2px rgba(31, 41, 55, 0.75);
}

.name {
  font-size: 0.9rem;
  font-family: 'BentonSansCond-Bold', sans-serif;
}
.acclaimed {
    font-size: 0.9rem;
    opacity: 0.85;
}

.margin {
    font-family: 'BentonSansCond-Bold', sans-serif;
    font-size: 1.4rem;
    font-weight: 900;
    margin-top: 3px;
}

/* COLOURS */
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

/* TILE PLACEMENT */
.abbotsford{
  grid-column:8;
  grid-row:5;
}
.anmore {
    grid-column:5;
    grid-row: 1;
}
.belcarra {
    grid-column: 3;
    grid-row: 1;
}
/*  */
.bowen-island {
    grid-column: 8;
    grid-row: 1;
}
.lions-bay{
  grid-column:7;
  grid-row:1;
}
.burnaby{
  grid-column:3;
  grid-row:3;
}
.coquitlam{
  grid-column:5;
  grid-row:2;
}
.delta{
  grid-column:3;
  grid-row:5; 
}
.langley-city{
  grid-column:6;
  grid-row:5;
}
.langley-township{
  grid-column:7;
  grid-row:5;
}
.maple-ridge{
  grid-column:7;
  grid-row:3;
}
.new-westminster{
  grid-column:4;
  grid-row:3;
}
.north-vancouver-city {
    grid-column: 2;
    grid-row: 2;
}
.north-vancouver-district {
    grid-column: 3;
    grid-row: 2;
}
.pitt-meadows{
  grid-column:6;
  grid-row:3;
}

.port-coquitlam{
  grid-column:5;
  grid-row:3;
}
.port-moody{
  grid-column:4;
  grid-row: 2;
}
.richmond{
  grid-column:3;
  grid-row:4;
}
.surrey{
  grid-column:5;
  grid-row:4;
}
.vancouver{
  grid-column:2;
  grid-row:3;
}
.west-vancouver {
    grid-column:1;
    grid-row:2;
}
.white-rock{
  grid-column:5;
  grid-row:5;
}
</style>