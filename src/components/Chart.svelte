<script>
    import { onMount } from 'svelte';

    // COMPONENTS
    import Tooltip from '$components/Tooltip.svelte';

    let { data = [], value = '' } = $props();

    // VARS
    let tooltipData = $state();
    let width = $state(500);
    let height = $state(500);

    const margin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20 
	};

    $effect(() => {
        console.log(data);
    });

    // FUNCTIONS
    function init() {
        console.log('CHART INIT!')
    }
    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // LIGHTS! CAMERA! ACTION!
    onMount(init);
</script>

<pre>{`CHART: Resolved data = ${JSON.stringify(data)}`}</pre>
<pre>CHART: Combobox value = {value || 'No selection'}</pre>

<div class="chart-container" bind:clientWidth={width}>

</div>