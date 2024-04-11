import PropTypes from 'prop-types'
import React, { lazy, useMemo } from 'react'

import { theme } from 'antd'

const { useToken } = theme

const World = lazy(() => import('../ui-components/extended/Globe'))

export function WorldGlobe ({ position, country = '' }) {
  const { token } = useToken()

  const colors = [token.colorPrimaryActive, token.colorPrimaryBg, token.colorSuccessActive, token.colorWarningBorder, token.colorInfo]

  const globeConfig = useMemo(() => ({
    pointSize: 20,
    globeColor: '#6696F4',
    showAtmosphere: true,
    atmosphereColor: '#FFFFFF',
    atmosphereAltitude: 0.1,
    emissive: '#6696F4',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: '#000',
    ambientLight: '#089AD9',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    autoRotate: true,
    initialPosition: position,
    country,
    countryColor: token.colorPrimaryBg
  }), [position, country, token])

  const sampleArcs = [
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
  ]

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '70vh',
      zIndex: 10,
      cursor: 'grab'
    }}
    >
      <World data={sampleArcs} globeConfig={globeConfig} />
    </div>
  )
}

WorldGlobe.propTypes = {
  position: PropTypes.object,
  country: PropTypes.string
}
