/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import { Color } from 'three'

import { genRandomNumbers, hexToRgb } from '../ui-components/extended/globeFunctions'
import countries from '../utils/data/globe.json'

const RING_PROPAGATION_SPEED = 900
let numbersOfRings = [0]

const isValidNumber = value => typeof value === 'number' && !isNaN(value)

export function useGlobeRef (globeConfig, defaultProps, data, country) {
  const [globeData, setGlobeData] = useState(null)
  const globeRef = useRef(null)

  useEffect(() => {
    if (globeRef.current) {
      _buildData()
      _buildMaterial()
    }
  }, [globeRef.current])


  const _buildMaterial = () => {
    if (!globeRef.current) return

    const globeMaterial = globeRef.current.globeMaterial()
    globeMaterial.color = new Color(globeConfig.globeColor)
    globeMaterial.emissive = new Color(globeConfig.emissive)
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1
    globeMaterial.shininess = globeConfig.shininess || 0.9
  }

  const _buildData = () => {
    const arcs = data
    const points = []
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i]
      const rgb = hexToRgb(arc.color)
      if (!isValidNumber(arc.startLat) || !isValidNumber(arc.startLng) || !isValidNumber(arc.endLat) || !isValidNumber(arc.endLng)) {
        console.error('Error: NaN values found in arc data', arc)
        continue
      }
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: t => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.startLat,
        lng: arc.startLng
      })
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: t => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.endLat,
        lng: arc.endLng
      })
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex(v2 => ['lat', 'lng'].every(k => v2[k] === v[k])) === i
    )

    setGlobeData(filteredPoints)
  }

  useEffect(() => {
    if (globeRef.current && globeData) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.6)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(e => {
          if (e.id?.toLowerCase() === country?.toLowerCase()) return defaultProps.countryColor
          return defaultProps.polygonColor
        })
      startAnimation()
    }
  }, [globeData, country])

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return

    globeRef.current
      .arcsData(data)
      .arcStartLat(d => d.startLat * 1)
      .arcStartLng(d => d.startLng * 1)
      .arcEndLat(d => d.endLat * 1)
      .arcEndLng(d => d.endLng * 1)
      .arcColor(e => e.color)
      .arcAltitude(e => {
        return e.arcAlt * 1
      })
      .arcStroke(e => {
        return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)]
      })
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap(e => e.order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(e => defaultProps.arcTime)

    globeRef.current
      .pointsData(data)
      .pointColor(e => e.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2)

    globeRef.current
      .ringsData([])
      .ringColor(e => t => e.color(t))
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      )
  }

  useEffect(() => {
    if (!globeRef.current || !globeData) return

    const interval = setInterval(() => {
      if (!globeRef.current || !globeData) return
      numbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5)
      )

      globeRef.current.ringsData(
        globeData.filter((d, i) => numbersOfRings.includes(i))
      )
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [globeRef.current, globeData])

  return globeRef
}
