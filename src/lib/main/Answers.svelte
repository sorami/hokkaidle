<script>
  import * as turf from "@turf/turf"

  import Tile from "./Tile.svelte"
  import Tooltip from "./Tooltip.svelte"
  import { MAX_TRY } from "../../constants"

  export let questionCity
  export let clickedCities

  function checkNameChars(questionName, answerName) {
    // check answer per character
    // hit: right char at right index
    // blow: right char but at wrong index

    let questionNameArray = [...questionName.padEnd(5, "_")]
    const answerNameArray = [...answerName.padEnd(5, "_")]
    let tiles = answerNameArray.map((d, i) => {
      return {
        char: d,
        style: "miss",
        face: "front",
        delay: 0.35 * i,
      }
    })

    // check all hits first, to avoid false blow hit
    tiles.forEach((d, i) => {
      if (d.char === questionNameArray[i]) {
        d.style = "hit"
        questionNameArray[i] = null // to avoid false blow
      }
    })

    // check blows
    tiles.forEach((d, i) => {
      if (d.style != "hit" && questionNameArray.includes(d.char)) {
        d.style = "blow"
        questionNameArray[questionNameArray.indexOf(d.char)] = null // to avoid duplicate blow
      }
    })

    return tiles
  }

  function checkRegionChars(questionRegion, answerRegion) {
    let questionRegionArray = [...questionRegion]
    let regionTiles = [...answerRegion].map((char) => {
      return {
        char,
        category: "miss",
      }
    })

    regionTiles.forEach((d, i) => {
      if (d.char === questionRegionArray[i]) {
        d.category = "hit"
        questionRegionArray[i] = null
      }
    })

    regionTiles.forEach((d, i) => {
      if (d.category != "hit" && questionRegionArray.includes(d.char)) {
        d.category = "blow"
        questionRegionArray[questionRegionArray.indexOf(d.char)] = null
      }
    })

    return regionTiles
  }

  function makeHint(questionCoordinates, answerCoordinates) {
    if (questionCoordinates === answerCoordinates) {
      return "star"
    }

    let bearing = turf.bearing(answerCoordinates, questionCoordinates)
    if (bearing < 0) {
      bearing = bearing + 360
    }

    let hintIcon = `${bearing.toFixed()}°`
    if (0 <= bearing && bearing <= 22.5) {
      hintIcon = "north"
    } else if (bearing <= 67.5) {
      hintIcon = "north_east"
    } else if (bearing <= 112.5) {
      hintIcon = "east"
    } else if (bearing <= 157.5) {
      hintIcon = "south_east"
    } else if (bearing <= 202.5) {
      hintIcon = "south"
    } else if (bearing <= 247.5) {
      hintIcon = "south_west"
    } else if (bearing <= 292.5) {
      hintIcon = "west"
    } else if (bearing <= 337.5) {
      hintIcon = "north_west"
    } else if (337.5 < bearing && bearing <= 360) {
      hintIcon = "north"
    }

    const distance = turf.distance(answerCoordinates, questionCoordinates)
    let iconCount = 10
    if (distance < 50) {
      iconCount = 1
    } else if (distance < 150) {
      iconCount = 2
    } else {
      iconCount = 3
    }

    return Array(iconCount).fill(hintIcon).join(" ")
  }

  $: answers = Array(MAX_TRY)
    .fill()
    .map((_, i) => {
      // unanswered row
      if (i >= clickedCities.length) {
        const tiles = Array(5)
          .fill()
          .map((i) => {
            return { char: "", style: "default", face: "back", delay: 0 }
          })
        return { answered: false, tiles, regionTiles: [], hint: "" }
      }

      // answered row
      const answerCity = clickedCities[i]
      const tiles = checkNameChars(questionCity.name, answerCity.name)
      const regionTiles = checkRegionChars(
        questionCity.region,
        answerCity.region
      )
      const hint = makeHint(questionCity.coordinates, answerCity.coordinates)
      return { answered: true, city: answerCity, tiles, regionTiles, hint }
    })
</script>

<div id="answer-grid">
  {#each answers as ans}
    <div class="answer-row">
      <div class="hint" class:answered={ans.answered}>
        <span class="material-symbols-outlined"> {ans.hint} </span>
      </div>

      <div class="tile-container">
        {#each ans.tiles as tile}
          <Tile
            char={tile.char}
            face={tile.face}
            style={tile.style}
            delay={tile.delay}
          />
        {/each}
      </div>

      <div class="tooltip-container" class:answered={ans.answered}>
        {#if ans.answered}
          <Tooltip content={ans} />
        {/if}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  #answer-grid {
    margin-top: 1.5em;

    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
    align-items: center;

    .answer-row {
      display: flex;
      align-items: strech;
      justify-content: center;
      column-gap: 1.15em;

      .hint {
        display: flex;
        justify-content: right;
        align-items: center;
        width: 5em;
        margin-right: 0.5em;

        .material-symbols-outlined {
          color: $tone-2;
          font-size: 1em;
          letter-spacing: -0.5em;
          width: 100%;
          text-align: right;
        }

        opacity: 0;
        transition: opacity 1.05s 2.15s;
        &.answered {
          opacity: 1;
        }
      }

      .tile-container {
        display: flex;
        gap: 0.5em;
      }

      .tooltip-container {
        width: 5em;
        display: flex;
        justify-content: left;
        align-items: end;

        opacity: 0;
        transition: opacity 1.05s 1.75s;
        &.answered {
          opacity: 1;
        }
      }
    }
  }
</style>
