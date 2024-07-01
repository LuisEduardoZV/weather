import { useEffect, useMemo, useState } from 'react'

import dayjs from 'dayjs'

import { BASE_URL_API, KEY_API } from '../config'
import { apiCall } from '../utils/apiFunctions'
import useConfig from './useConfig'

export function useGetWeather (position) {
  const { units } = useConfig()

  const [loading, setLoading] = useState(true)
  const [todayData, setTodayData] = useState({})
  const [nextData, setNextData] = useState({})

  const dataViews = useMemo(() => {
    if (nextData?.weather && nextData?.air) {
      const separetedInfo = {
        weather: {},
        air: {}
      }
      const { weather, air } = nextData

      if (weather?.list) {
        weather.list.forEach(e => {
          const key = dayjs(e.dt_txt).format('YYYY-MM-DD')
          if (Object.keys(separetedInfo.weather).includes(key)) {
            separetedInfo.weather[key]?.push(e)
          } else {
            separetedInfo.weather[key] = [e]
          }
        })
      }

      if (air) {
        air.list.forEach(e => {
          const key = dayjs(e.dt * 1000).format('YYYY-MM-DD')
          if (Object.keys(separetedInfo.air).includes(key)) {
            separetedInfo.air[key]?.push(e)
          } else {
            separetedInfo.air[key] = [e]
          }
        })
      }

      return separetedInfo
    }
    return nextData
  }, [nextData])

  useEffect(() => {
    try {
      if (position?.cords && units?.type) {
        const resToday = apiCall({ url: `${BASE_URL_API}/weather?lat=${position?.cords?.lat}&lon=${position?.cords?.lng}&appid=${KEY_API}&units=${units.type}` })
        const airToday = apiCall({ url: `${BASE_URL_API}/air_pollution?lat=${position?.cords?.lat}&lon=${position?.cords?.lng}&appid=${KEY_API}` })
        const nextDays = apiCall({ url: `${BASE_URL_API}/forecast?lat=${position?.cords?.lat}&lon=${position?.cords?.lng}&appid=${KEY_API}&units=${units.type}` })
        const nextDaysAir = apiCall({ url: `${BASE_URL_API}/air_pollution/forecast?lat=${position?.cords?.lat}&lon=${position?.cords?.lng}&appid=${KEY_API}&units=${units.type}` })


        Promise.all([resToday, airToday, nextDays, nextDaysAir]).then((values) => {
          if (Array.isArray(values) && values.length > 3) {
            setTodayData({ ...values[0], air: { ...values[1] } })
            setNextData({ weather: { ...values[2] }, air: { ...values[3] } })
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }

    return () => setLoading(true)
  }, [position, units?.type])

  return { loading, todayData, dataViews }
}
