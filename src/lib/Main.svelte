<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import * as d3 from "d3"

  import { MAX_TRY } from "../constants"
  import Question from "./main/Question.svelte"
  import Map from "./main/Map.svelte"
  import Answers from "./main/Answers.svelte"

  // list of city informations: loaded on mount
  let cities = []
  $: code2city = d3.index(cities, (d) => d.code)

  // a randomly selected city for the quiz
  let questionCity = { name: "", region: "" }
  const selectRandom = () => {
    questionCity = cities[Math.floor(Math.random() * cities.length)]
  }

  // answers of the user: passed from Map component
  let clickedCodes = []
  $: clickedCities = clickedCodes.map((i) => code2city.get(i))

  onMount(async () => {
    cities = await d3.json("./cities.json")
    selectRandom()
  })

  // whether the current quiz round is at the end or not
  $: finished =
    clickedCodes.length >= MAX_TRY ||
    clickedCities.map((d) => d.code).includes(questionCity.code)

  // reset map, clear answers, and re-select the question
  let resetMap
  let refresh = () => {
    resetMap()
    clickedCodes = []
    selectRandom()
  }
</script>

<main>
  <Question city={questionCity} {finished} {refresh} />

  <Map {questionCity} bind:clickedCodes bind:finished bind:resetMap />

  <Answers {questionCity} {clickedCities} />

  {#if finished}
    <div id="refresh" transition:fade={{ delay: 0, duration: 700 }}>
      <button on:click={refresh}>
        <span class="material-symbols-outlined"> refresh </span>
      </button>
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    max-width: 750px;
    margin: 0 auto;
    padding: 0 1em;
  }

  #refresh {
    margin: 2em 0;
    text-align: center;

    .material-symbols-outlined {
      font-size: 2.5em;
      color: $tone-2;
    }
    .material-symbols-outlined:hover {
      opacity: 0.75;
    }
  }
</style>
