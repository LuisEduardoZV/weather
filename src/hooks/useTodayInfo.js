import { useMemo } from 'react'

import { theme } from 'antd'

import weather from '../utils/data/weathers.json'
import { getIcon } from '../utils/iconWeather'

const { useToken } = theme

export function useTodayInfo (loading, todayData) {
  const { token } = useToken()
  const infoWeather = useMemo(() => {
    if (loading) return { desc: '', icons: [] }
    const clima = todayData?.weather[0]
    const desc = weather[clima?.id ?? 200]
    const infoIcons = getIcon(token, todayData?.weather[0]?.icon ?? '01d')

    return { desc, infoIcons }
  }, [todayData, loading, token])

  const contamination = useMemo(() => {
    if (loading) return []
    const info = todayData?.air?.list[0]?.components
    const respose = []
    for (const key in info) {
      if (Object.hasOwnProperty.call(info, key)) {
        const element = info[key]
        respose.push({
          title: key?.toUpperCase()?.replace(/[^a-zA-Z]/g, ''),
          value: element,
          sufix: 'μg/m3',
          elevation: key?.match(/[^a-zA-Z]/g)?.join('')?.replace('_', '.') ?? null
        })
      }
    }
    return respose
  }, [todayData, loading])

  return { infoWeather, contamination }
}
