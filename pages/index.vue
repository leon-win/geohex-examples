<template>
  <div id="heart-map" />
</template>

<script>
export default {
  mounted () {
    this.initHeartMap()
  },
  methods: {
    initHeartMap () {
      const heartMapInstance = window.L.map('heart-map', {
        boxZoom: false,
        doubleClickZoom: false,
        layers: [
          window.L.tileLayer(
            `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
            {
              id: 'mapbox/streets-v11',
              bounds: [
                [-85.0512, -180],
                [85.0512, 180]
              ]
            }
          )
        ],
        maxBounds: [
          [-180, -180],
          [180, 180]
        ],
        maxBoundsViscosity: 1,
        minZoom: 2
      }).fitWorld()

      const heartCells = [
        [3, 2],
        [4, 2],
        [4, 1],
        [4, 0],
        [3, -1],
        [2, -2],
        [1, -2],
        [0, -3],
        [-1, -3],
        [-2, -3],
        [-3, -3],
        [-3, -2],
        [-3, -1],
        [-3, 0],
        [-2, 1],
        [-2, 2],
        [-1, 3],
        [0, 4],
        [1, 4],
        [2, 4],
        [2, 3],
        [2, 2],
        [1, 1]
      ]

      const polygonOptions = {
        className: 'hexagon-cell',
        stroke: false,
        fillColor: 'red',
        fillOpacity: 1,
        fillRule: 'nonzero'
      }

      const cellIntervalID = setInterval(() => {
        if (!heartCells.length) {
          return clearInterval(cellIntervalID)
        }

        const cellHexCoords = heartCells.pop()
        const cell = window.Geohex.getCellByXY(
          cellHexCoords[0],
          cellHexCoords[1],
          0
        )

        const hexPolygon = cell
          .getHexCoords()
          .map(hexCorner => [hexCorner.lat, hexCorner.lon])

        window.L.polygon(hexPolygon, polygonOptions).addTo(heartMapInstance)
      }, 85)
    }
  }
}
</script>

<style scoped>
#heart-map {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

#heart-map >>> .hexagon-cell {
  animation: ease-in infinite alternate fadein 1s;
}

@keyframes fadein {
  from {
    opacity: 0.25;
  }

  to {
    opacity: 0.75;
  }
}
</style>
