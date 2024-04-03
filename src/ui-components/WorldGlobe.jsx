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
      startLat: position.lat,
      startLng: position.lon,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.5,
      color: token.colorPrimaryActive
    }
  ]

  return (
    <div style={{
      position: 'absolute',
      width: '40%',
      height: '70vh',
      zIndex: 10
    }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        transform: 'scale(0.75)',
        width: '100%',
        height: '70vh',
        boxShadow: '2.9px 3.6px 1.2px rgba(0, 0, 0, 0.015),6.5px 8px 2.7px rgba(0, 0, 0, 0.022),10.8px 13.4px 4.6px rgba(0, 0, 0, 0.027),16.3px 20.2px 6.9px rgba(0, 0, 0, 0.031),23.5px 29.2px 10px rgba(0, 0, 0, 0.035),33.3px 41.3px 14.2px rgba(0, 0, 0, 0.039),47.2px 58.6px 20.1px rgba(0, 0, 0, 0.043),68.6px 85px 29.2px rgba(0, 0, 0, 0.048),105.8px 131.1px 45px rgba(0, 0, 0, 0.055),188px 233px 80px rgba(0, 0, 0, 0.07)',
        borderRadius: '50%',
        padding: 0,
        margin: 0
      }}
      />
      <World data={sampleArcs} globeConfig={globeConfig} />
    </div>
  )
}

WorldGlobe.propTypes = {
  position: PropTypes.object,
  country: PropTypes.string
}
