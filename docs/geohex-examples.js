/* global Geohex, L */

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibGVvbi12aW5vZ3JhZG92IiwiYSI6ImNqbmt1YWR5bzFlNTAzd28zMTFkbXdrNzYifQ.CaItW4BNGEgvWl74RTikHw'

function initHeartMap () {
  const heartMapInstance = L
    .map('heart-map', {
      boxZoom: false,
      doubleClickZoom: false,
      layers: [
        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`, {
          id: 'mapbox/streets-v11',
          bounds: [[-85.0512, -180], [85.0512, 180]]
        })
      ],
      maxBounds: [[-180, -180], [180, 180]],
      maxBoundsViscosity: 1,
      minZoom: 2
    })
    .fitWorld()

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
    const cell = Geohex.getCellByXY(cellHexCoords[0], cellHexCoords[1], 0)

    const hexPolygon = cell
      .getHexCoords()
      .map(hexCorner => [hexCorner.lat, hexCorner.lon])

    L
      .polygon(hexPolygon, polygonOptions)
      .addTo(heartMapInstance)
  }, 85)
}

initHeartMap()
