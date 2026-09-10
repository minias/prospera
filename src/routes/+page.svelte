<!-- src/routes/+page.svelte -->
<script lang="ts">
  import WorldCanvas from '$lib/components/world/WorldCanvas.svelte';
</script>

<svelte:head>
  <title>Prospera World</title>
  <meta
    name="description"
    content="Prospera World — Enter the Intelligence."
  />
</svelte:head>

<main class="world-page">
  <WorldCanvas />

  <header class="brand-header">
    <a class="brand" href="/" aria-label="Prospera home">
      PROSPERA
    </a>

    <span class="world-label">WORLD</span>
  </header>

  <section class="hero" aria-labelledby="hero-title">
    <p class="eyebrow">INTELLIGENCE</p>

    <h1 id="hero-title">
      Intelligence<br />
      that moves business.
    </h1>

    <p class="hero-description">
      Technology, systems and intelligence<br />
      designed to move your business forward.
    </p>
  </section>

  <a class="explore" href="#explore">
    <span>EXPLORE</span>
    <span class="arrow" aria-hidden="true">→</span>
  </a>
</main>

<style>
  .world-page {
    position: fixed;
    inset: 0;
    overflow: hidden;
    background: #05070a;
    color: #f4f8fb;
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  .brand-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 32px 40px;

    pointer-events: none;
  }

  .brand,
  .world-label,
  .explore {
    pointer-events: auto;
  }

  .brand {
    color: #f4f8fb;
    text-decoration: none;

    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .world-label {
    color: rgba(244, 248, 251, 0.48);

    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.24em;
  }

  .hero {
    position: absolute;
    left: 40px;
    bottom: 72px;
    z-index: 10;

    max-width: 520px;
    pointer-events: none;
  }

  .eyebrow {
    margin: 0 0 16px;

    color: #8edfff;

    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.28em;
  }

  h1 {
    margin: 0;

    font-size: clamp(38px, 5vw, 72px);
    font-weight: 500;
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  .hero-description {
    margin: 24px 0 0;

    color: rgba(244, 248, 251, 0.58);

    font-size: 14px;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0.01em;
  }

  .explore {
    position: absolute;
    right: 40px;
    bottom: 72px;
    z-index: 10;

    display: flex;
    align-items: center;
    gap: 14px;

    color: #f4f8fb;
    text-decoration: none;

    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
  }

  .arrow {
    font-size: 20px;
    font-weight: 300;
    line-height: 1;
    transition: transform 180ms ease;
  }

  .explore:hover .arrow {
    transform: translateX(5px);
  }

  @media (max-width: 640px) {
    .brand-header {
      padding: 24px;
    }

    .brand {
      font-size: 16px;
    }

    .hero {
      left: 24px;
      right: 24px;
      bottom: 72px;
    }

    h1 {
      font-size: clamp(36px, 11vw, 52px);
    }

    .hero-description {
      font-size: 13px;
    }

    .explore {
      right: 24px;
      bottom: 24px;
    }
  }
</style>