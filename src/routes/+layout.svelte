<!-- src/routes/+layout.svelte -->
<script lang="ts">
  let { children } = $props();
</script>

{@render children()}