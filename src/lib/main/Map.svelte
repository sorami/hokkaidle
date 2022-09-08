<script>
  import { onMount } from "svelte"
  import * as d3 from "d3"
  import * as topojson from "topojson-client"
  import party from "party-js"
  import { MAX_TRY } from "../../constants"

  export let questionCity
  export let clickedCodes
  export const finished = false

  let map
  let mapTooltip

  let resetZoom = () => {}
  export const resetMap = () => {
    d3.select(map).selectAll("path").classed("hit blow miss", false)
    resetZoom()
  }

  onMount(async () => {
    const width = Math.min(
      750,
      d3.select(map).node().getBoundingClientRect().width
    )
    const height = width * 0.6

    let dimensions = {
      width,
      height,
      margins: {
        top: 8,
        bottom: 8,
        right: 8,
        left: 8,
      },
    }
    dimensions.boundedWidth =
      dimensions.width - dimensions.margins.left - dimensions.margins.right
    dimensions.boundedHeight =
      dimensions.height - dimensions.margins.top - dimensions.margins.bottom

    const svg = d3
      .select(map)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    // zoom & pan

    function zoomed(event) {
      const { transform } = event
      land.attr("transform", transform)
      land.attr("stroke-width", 1 / transform.k)
    }
    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed)
    svg.call(zoom)
    resetZoom = () => {
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        )
    }

    // background

    const background = svg
      .append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 6)
      .attr("ry", 6)
    background.on("click", () => {
      resetZoom()
    })

    // land

    const topology = await d3.json("./hokkaido.topojson")
    const geometry = topojson.feature(topology, topology.objects["hokkaido"])
    const code2geometry = d3.index(geometry.features, (d) => d.properties.code)
    const projection = d3.geoMercator().fitExtent(
      [
        [0, 0],
        [dimensions.boundedWidth, dimensions.boundedHeight],
      ],
      geometry
    )
    const path = d3.geoPath().projection(projection)
    const bounds = svg
      .append("g")
      .style(
        "transform",
        `translate(${dimensions.margins.left}px, ${dimensions.margins.top}px)`
      )

    const land = bounds
      .append("g")
      .attr("class", "land")
      .selectAll("path")
      .data(geometry.features)
      .enter()
      .append("path")
      .attr("d", path)
      .on("mouseenter", mouseenter)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("click tap touch", clickishEvent)

    // functions for events

    function mouseenter(event, d) {
      d3.select(this).classed("hovered", true)

      // show tooltip if it's already clicked
      if (clickedCodes.includes(d.properties.code))
        d3.select(mapTooltip)
          .html(d.properties.name)
          .transition()
          .duration(300)
          .style("opacity", 1)
    }

    function mousemove(event, d) {
      // let the tooltip follow cursor
      if (clickedCodes.includes(d.properties.code)) {
        const pos = d3.pointer(event, svg.node())
        d3.select(mapTooltip)
          .style("left", `${pos[0]}px`)
          .style("top", `${pos[1]}px`)
      }
    }

    function mouseleave(event, d) {
      d3.select(this).classed("hovered", false)

      // hide tooltip
      if (clickedCodes.includes(d.properties.code)) {
        d3.select(mapTooltip).transition().duration(300).style("opacity", 0)
      }
    }

    function clickishEvent(event, d) {
      const code = d.properties.code
      if (
        clickedCodes.length >= MAX_TRY ||
        clickedCodes.includes(code) ||
        clickedCodes.includes(questionCity.code)
      ) {
        return
      }

      clickedCodes = [...clickedCodes, code]

      // judge
      if (code === questionCity.code) {
        d3.select(this).classed("hit", true)
        confetti(event)
      } else if (d.properties.region === questionCity.region) {
        d3.select(this).classed("blow", true)
      } else {
        d3.select(this).classed("miss", true)
      }

      // at the end of the round, animate
      if (code === questionCity.code || clickedCodes.length >= MAX_TRY) {
        const duration = 2000

        if (!clickedCodes.includes(questionCity.code)) {
          setTimeout(() => {
            d3.selectAll("path")
              .filter((feat) => feat.properties.code === questionCity.code)
              .classed("hit", true)
          }, duration * 0.75)
        }

        zoomToBB(event, code2geometry.get(questionCity.code), duration, 5)
      }
    }

    function zoomToBB(event, geometry, duration, scale) {
      // zoom to a bounding box
      // cf. https://observablehq.com/@d3/zoom-to-bounding-box
      const [[x0, y0], [x1, y1]] = path.bounds(geometry)
      event.stopPropagation()
      svg
        .transition()
        .duration(duration)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(
                scale,
                0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
              )
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, svg.node())
        )
    }
  })

  function confetti(event) {
    party.confetti(event, {
      count: party.variation.range(80, 160),
      color: () => party.Color.fromHex("#6aaa64"),
    })
  }
</script>

<div id="map" bind:this={map}>
  <div id="map-tooltip" bind:this={mapTooltip} />
</div>

<style lang="scss">
  #map {
    position: relative;

    display: flex;
    justify-content: center;

    :global(.background) {
      fill: $tone-5;
    }

    :global(.land) {
      stroke-width: 0.75px;
      stroke: $tone-2;
      fill: $tone-7;

      :global(.hovered) {
        fill: $tone-1;
      }

      :global(.hit) {
        fill: $green;
      }
      :global(.blow) {
        fill: $yellow;
      }
      :global(.miss) {
        fill: $tone-3;
      }
    }
  }

  #map-tooltip {
    opacity: 0;
    position: absolute;
    padding: 0.25em 1.25em;
    border-radius: 0.75em;

    background-color: $tone-7;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    color: $tone-2;
    font-size: 0.5em;
    font-weight: 600;
  }
</style>
