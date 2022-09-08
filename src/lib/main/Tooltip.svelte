<script>
  export let content
</script>

<div class="tooltip">
  <div class="tooltip-icon">
    <span class="material-symbols-outlined"> help </span>
  </div>
  <div class="tooltip-text">
    <div class="region">
      {#each content.regionTiles as tile}
        <div class={`tile ${tile.category}`}>
          {tile.char}
        </div>
      {/each}
    </div>
    <p>
      ”{content.city.abstract}”
      <a href={content.city.wikipedia} target="_blank">Wikipedia</a>
    </p>
  </div>
</div>

<style lang="scss">
  .tooltip {
    .tooltip-icon {
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

    &:hover .tooltip-text {
      visibility: visible;
      opacity: 1;
    }
    .tooltip-text {
      transition: visibility 0.35s, opacity 0.7s;
      visibility: hidden;
      opacity: 0;

      position: absolute;
      z-index: 1;
      width: 12em;
      margin-top: -1.2em;
      margin-left: -11.5em;

      text-align: center;
      padding: 0.75em;
      border-radius: 0.5em;

      color: $tone-2;
      background-color: $tone-6;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

      .region {
        display: flex;
        flex-direction: row;
        column-gap: 0.25em;
        justify-content: center;
        margin-bottom: 0.5em;

        color: $tone-7;
        font-weight: 500;
        font-size: 0.75em;

        .tile {
          width: 1.5em;
          height: 1.5em;
          display: flex;
          justify-content: center;
          align-items: center;

          &.hit {
            background-color: $green;
          }
          &.blow {
            background-color: $yellow;
          }
          &.miss {
            background-color: $tone-2;
          }
        }
      }
      p {
        font-size: 0.75em;
        line-height: 1.25em;
      }
      a {
        color: $tone-2;
      }
      a:hover {
        opacity: 0.5;
      }
    }
  }
</style>
