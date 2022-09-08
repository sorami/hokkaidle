<script>
  import { getContext } from "svelte"
  import Popup from "./Popup.svelte"
  const { open } = getContext("simple-modal")
  const showPopup = () => open(Popup)
</script>

<header>
  <div id="header-items">
    <div class="icon">
      <a href="https://sorami.dev" target="_blank">
        <span class="material-symbols-outlined"> cottage </span>
      </a>
    </div>

    <h1 on:click={showPopup}><span class="hokkaid">HOKKAID</span>LE</h1>

    <div class="icon" on:click={showPopup}>
      <span class="material-symbols-outlined"> info </span>
    </div>
  </div>
</header>

<style lang="scss">
  header {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border-bottom: solid 1px $tone-4;
  }

  #header-items {
    max-width: 750px;
    margin: 0 auto;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon {
    cursor: pointer;

    .material-symbols-outlined {
      color: $tone-1;
    }

    .material-symbols-outlined:hover {
      color: $green;
    }
  }

  h1 {
    cursor: pointer;

    font-size: 1.2em;
    font-weight: normal;
    font-family: "Bevan", serif;

    &:hover .hokkaid {
      color: $yellow;
    }

    .hokkaid {
      color: $green;
      opacity: 1;
    }
  }
</style>
