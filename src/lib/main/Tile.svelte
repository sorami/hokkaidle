<script>
  export let char = ""

  export let style = "default"
  export let round = false
  export let blur = false

  export let face = "back"
  export let delay = 0
</script>

<div class={`tile face-${face}`}>
  <div class="tile-inner" style:transition-delay={`${delay}s`}>
    <div class={`tile-front ${style}`} class:round class:blur>{char}</div>
    <div class="tile-back" class:round class:blur />
  </div>
</div>

<style lang="scss">
  .tile {
    background-color: transparent;
    width: 2.5rem;
    height: 2.5rem;
    cursor: default;

    font-size: 1.2em;
    font-weight: 600;
    color: $tone-7;

    perspective: 100em;

    &:hover {
      opacity: 0.75;
    }

    &.face-back .tile-inner {
      transform: rotateX(-180deg);
    }

    .tile-inner {
      position: relative;
      width: 100%;
      height: 100%;

      transition-property: transform;
      transition-duration: 0.75s;
      transform-style: preserve-3d;

      .tile-back {
        transform: rotateX(180deg);

        background-color: $tone-7;
        color: $tone-4;
        border: solid 2px $tone-3;
      }

      .tile-front,
      .tile-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;

        display: flex;
        justify-content: center;
        align-items: center;

        &.default,
        &.miss {
          background-color: $tone-2;
        }
        &.hit {
          background-color: $green;
        }
        &.blow {
          background-color: $yellow;
        }

        transition: filter 0.15s;
        &.blur {
          filter: blur(4px);
          color: $tone-5;
        }
        &.round {
          border-radius: 100%;
        }
      }
    }
  }
</style>
