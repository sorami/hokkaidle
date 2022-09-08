<script>
  import Tile from "./Tile.svelte"
  import Tooltip from "./Tooltip.svelte"

  export let city
  $: cityNamePadded = city.name.padEnd(5, "_")

  export let finished
  export let refresh

  let blurUserSetting = true
  $: blur = finished ? false : blurUserSetting
  $: visibilityIcon = blur ? "visibility_off" : "visibility"

  $: tooltipContent = {
    city,
    regionTiles: [...city.region].map((char) => {
      return { char, category: "hit" }
    }),
  }
</script>

<div id="question">
  <button id="refresh" on:click={refresh()} class:finished>
    <span class="material-symbols-outlined"> refresh </span>
  </button>

  <button
    id="visibility"
    on:click={() => (blurUserSetting = !blurUserSetting)}
    class:finished
  >
    <span class="material-symbols-outlined"> {visibilityIcon} </span>
  </button>

  <div class="tile-container">
    {#each cityNamePadded as char}
      <Tile
        {char}
        face="front"
        style={finished ? "hit" : "default"}
        round={true}
        {blur}
      />
    {/each}
  </div>

  <div class="tooltip-container" class:finished>
    <Tooltip content={tooltipContent} />
  </div>
</div>

<style lang="scss">
  #question {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    display: flex;
    gap: 1em;
    justify-content: center;
    align-items: end;
  }

  #refresh,
  #visibility {
    .material-symbols-outlined {
      height: 100%;
      cursor: pointer;
      color: $tone-2;
      font-size: 1.75em;
      &:hover {
        opacity: 0.75;
      }
    }
  }

  #refresh {
    display: none;
    &.finished {
      display: block;
      animation: appear 3s ease;
      @keyframes appear {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .material-symbols-outlined {
        color: $tone-2;
      }
    }
  }
  #visibility {
    &.finished {
      display: none;
    }
  }

  .tile-container {
    margin: 0 1em;
    display: flex;
    column-gap: 0.5em;
  }

  .tooltip-container {
    opacity: 0;
    &.finished {
      opacity: 1;
    }
  }
</style>
