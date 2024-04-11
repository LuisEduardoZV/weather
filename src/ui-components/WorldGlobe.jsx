import PropTypes from 'prop-types'
import React, { lazy, useMemo } from 'react'

import { theme } from 'antd'

const { useToken } = theme

const World = lazy(() => import('../ui-components/extended/Globe'))

export function WorldGlobe ({ position, country = '' }) {
  const { token } = useToken()

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
    countryColor: token.colorSuccess
  }), [position, country, token.colorSuccess])

  const sampleArcs = [
    {
      order: 3,
      startLat: position?.lat,
      startLng: position?.lon,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.5,
      color: token.colorPrimaryActive
    }
  ]

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '70vh',
      zIndex: 10
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
