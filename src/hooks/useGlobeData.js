import { useMemo } from 'react'

import { theme } from 'antd'

import globeLines from '../utils/data/globe-lines.json'

const { useToken } = theme

export function useGlobeData (globeConfig) {
  const { token } = useToken()

  const data = useMemo(() => {
    const colors = [token.colorPrimaryActive, token.colorPrimaryBg, token.colorSuccessActive, token.colorWarningBorder, token.colorInfo]

    const position = globeConfig?.initialPosition

    const newGlobeLines = globeLines.map((op) => {
      const { endLat } = op

      return endLat
        ? ({
            ...op,
            startLat: position.lat || -22.9068,
            startLng: position.lon || -22.9068,
            color: colors[Math.floor(Math.random() * (colors.length - 1))]
          })
        : ({
            ...op,
            endLat: position.lat || -22.9068,
            endLng: position.lon || -22.9068,
            color: colors[Math.floor(Math.random() * (colors.length - 1))]
          })
    })

    return (newGlobeLines)
  }, [globeConfig?.initialPosition, token.colorInfo, token.colorPrimaryActive, token.colorPrimaryBg, token.colorSuccessActive, token.colorWarningBorder])

  return data
}
