import { useMemo } from 'react'

export function usePredictInfo (nextData, view) {
  const promedioInfo = useMemo(() => {
    const info = {
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0
      },
      wind: {
        speed: 0,
        deg: 0,
        gust: 0
      }
    }

    if (nextData.weather && nextData.weather[view]) {
      const currentData = nextData.weather[view]
      currentData.forEach(op => {
        const { main, wind } = op
        info.main.temp += main.temp
        info.main.feels_like += main.feels_like
        info.main.temp_min += main.temp_min
        info.main.temp_max += main.temp_max

        info.wind.speed += wind.speed
        info.wind.deg += wind.deg
        info.wind.gust += wind.gust
      })

      const tam = currentData.length

      info.main.temp /= tam
      info.main.feels_like /= tam
      info.main.temp_min /= tam
      info.main.temp_max /= tam

      info.wind.speed /= tam
      info.wind.deg /= tam
      info.wind.gust /= tam
    }

    return info
  }, [nextData, view])

  const airMedInfo = useMemo(() => {
    const info = {
      components: {
        co: 0,
        no: 0,
        no2: 0,
        o3: 0,
        so2: 0,
        pm2_5: 0,
        pm10: 0,
        nh3: 0
      }
    }

    if (nextData.air) {
      const currentData = nextData.air[view]
      currentData.forEach(op => {
        const { components } = op
        for (const key in components) {
          if (Object.hasOwnProperty.call(components, key)) {
            const element = components[key]
            info.components[key] += element
          }
        }
      })

      const tam = currentData.length

      for (const key in info) {
        if (Object.hasOwnProperty.call(info, key)) info.components[key] /= tam
      }
    }

    delete info.components?.components

    const respose = []
    for (const key in info.components) {
      if (Object.hasOwnProperty.call(info.components, key)) {
        const element = info.components[key]
        respose.push({
          title: key?.toUpperCase()?.replace(/[^a-zA-Z]/g, ''),
          value: element,
          sufix: 'μg/m3',
          elevation: key?.match(/[^a-zA-Z]/g)?.join('')?.replace('_', '.') ?? null
        })
      }
    }

    return respose
  }, [nextData, view])

  const mainData = useMemo(() => {
    const { weather } = nextData
    if (weather && nextData.weather[view]) return nextData.weather[view]
    return []
  }, [nextData, view])

  return { promedioInfo, airMedInfo, mainData }
}
