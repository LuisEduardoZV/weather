import PropTypes from 'prop-types'
import { useMemo } from 'react'

import { useGlobeData } from '../../hooks/useGlobeData'
import { useGlobeRef } from '../../hooks/useGlobeRef'

const Globe = ({ globeConfig }) => {
  const country = useMemo(() => (globeConfig?.country ?? ''), [globeConfig])

  const data = useGlobeData(globeConfig)

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

  const globeRef = useGlobeRef(globeConfig, defaultProps, data, country)

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  )
}

Globe.propTypes = {
  globeConfig: PropTypes.object
}

export default Globe
