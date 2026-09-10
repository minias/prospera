<!-- src/lib/components/world/WorldCanvas.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ThreeWorld } from '$lib/infrastructure/three/ThreeWorld';

  let container: HTMLDivElement;

  onMount(() => {
    const world = new ThreeWorld(container);

    return () => {
      world.dispose();
    };
  });
</script>

<div class="world-canvas" bind:this={container} aria-label="Prospera World 3D scene"></div>

<style>
  .world-canvas {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .world-canvas :global(canvas) {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
