/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { theme } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Color, Fog, PerspectiveCamera, Scene, Vector3 } from 'three'
import ThreeGlobe from 'three-globe'
import countries from '../../utils/data/globe.json'

extend({ ThreeGlobe })
const { useToken } = theme

const RING_PROPAGATION_SPEED = 900
const aspect = 1
const cameraZ = 300

let numbersOfRings = [0]

export function Globe ({ globeConfig }) {
  const [globeData, setGlobeData] = useState(null)
  const { token } = useToken()
  const country = useMemo(() => (globeConfig?.country ?? ''), [globeConfig])

  const data = useMemo(() => {
    const colors = [token.colorPrimaryActive, token.colorPrimaryBg, token.colorSuccessActive, token.colorWarningBorder, token.colorInfo]

    const position = globeConfig?.initialPosition

    return ([
      {
        order: 1,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: -22.9068,
        endLng: -43.1729,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 1,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 3.139,
        endLng: 101.6869,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 1,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: -1.303396,
        endLng: 36.852443,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 2,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 2,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 3.139,
        endLng: 101.6869,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 2,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 36.162809,
        endLng: -115.119411,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 3,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 3,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 40.7128,
        endLng: -74.006,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 3,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 51.5072,
        endLng: -0.1276,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 4,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: -15.595412,
        endLng: -56.05918,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 4,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 4,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 48.8566,
        endLng: -2.3522,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 5,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 51.5072,
        endLng: -0.1276,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 5,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: -33.8688,
        endLng: 151.2093,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 5,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 48.8566,
        endLng: -2.3522,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 6,
        startLat: -15.432563,
        startLng: 28.315853,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 6,
        startLat: 37.5665,
        startLng: 126.978,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 6,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 7,
        startLat: -19.885592,
        startLng: -43.951191,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 7,
        startLat: 48.8566,
        startLng: -2.3522,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 7,
        startLat: 52.52,
        startLng: 13.405,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 8,
        startLat: -8.833221,
        startLng: 13.264837,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 8,
        startLat: 49.2827,
        startLng: -123.1207,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 8,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 9,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 9,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 9,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 10,
        startLat: -22.9068,
        startLng: -43.1729,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.7,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 10,
        startLat: 34.0522,
        startLng: -118.2437,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 10,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 11,
        startLat: 41.9028,
        startLng: 12.4964,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 11,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 11,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 12,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 37.7749,
        endLng: -122.4194,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 12,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 12,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 34.0522,
        endLng: -118.2437,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 13,
        startLat: 52.52,
        startLng: 13.405,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 13,
        startLat: 11.986597,
        startLng: 8.571831,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 13,
        startLat: -22.9068,
        startLng: -43.1729,
        endLat: position?.lat,
        endLng: position?.lon,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      },
      {
        order: 14,
        startLat: position?.lat,
        startLng: position?.lon,
        endLat: 21.395643,
        endLng: 39.883798,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]
      }
    ])
  }, [globeConfig?.initialPosition?.lat, globeConfig?.initialPosition?.lon, token.colorInfo, token.colorPrimaryActive, token.colorPrimaryBg, token.colorSuccessActive, token.colorWarningBorder])

  const globeRef = useRef(null)

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: '#ffffff',
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: 'rgba(255,255,255,0.7)',
    globeColor: '#7d0bd6',
    emissive: '#000000',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig
  }

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

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  )
}

export function WebGLRendererConfig () {
  const { gl, size } = useThree()

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio)
    gl.setSize(size.width, size.height)
    gl.setClearColor(0xffaaff, 0)
  }, [])

  return null
}


export function hexToRgb (hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

export function genRandomNumbers (min, max, count) {
  const arr = []
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min
    if (arr.indexOf(r) === -1) arr.push(r)
  }

  return arr
}

export default function World (props) {
  const { globeConfig } = props
  const scene = new Scene()
  scene.fog = new Fog(0xffffff, 400, 2000)
  return (
    <Canvas id='canvasMain' scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)} style={{ width: '100%', maxWidth: '100%', minWidth: '100%' }}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-400, 500, 50)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={globeConfig.autoRotate}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
        position={[0, 0, 0]}
        position0={[0, 0, 0]}
      />
    </Canvas>
  )
}
