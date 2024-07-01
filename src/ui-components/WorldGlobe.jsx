import PropTypes from 'prop-types'
import React, { lazy, memo, useMemo } from 'react'

import { theme } from 'antd'

const { useToken } = theme

const World = lazy(() => import('./extended/World'))

const WorldGlobe = memo(({ position, country = '' }) => {
  const { token } = useToken()

  const globeConfig = useMemo(() => ({
    pointSize: 20,
    globeColor: '#5383F3',
    showAtmosphere: true,
    atmosphereColor: '#000',
    atmosphereAltitude: 0.2,
    emissive: '#5383F3',
    emissiveIntensity: 0.05,
    shininess: 0.9,
    polygonColor: '#000',
    ambientLight: '#0A369D',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 1000,
    arcLength: 0.9,
    rings: 2,
    maxRings: 3,
    autoRotate: true,
    initialPosition: position,
    country,
    countryColor: token.colorPrimaryBg
  }), [position, country, token])

  return (
    <>
      <World globeConfig={globeConfig} />
    </>
  )
})

WorldGlobe.displayName = 'WorldGlobe'

WorldGlobe.propTypes = {
  position: PropTypes.object,
  country: PropTypes.string
}

export { WorldGlobe }

