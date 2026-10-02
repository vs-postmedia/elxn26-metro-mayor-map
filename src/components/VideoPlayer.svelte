<script>
    let { videoElement = $bindable() } = $props();

    // VIDEO
    const videoPath = import.meta.env.MODE === 'production' ? './video' : '/video';
    const videoUrlMp4 = `${videoPath}/video.mp4`;
    const videoUrlWebm = `${videoPath}/video.webm`;
</script>


<div class="video-container">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video bind:this={videoElement} preload="auto">
        <source src={videoUrlMp4} type="video/mp4">
        <source src={videoUrlWebm} type="video/webm">
            Your browser doesn’t support the video tag.
    </video>
</div>  
