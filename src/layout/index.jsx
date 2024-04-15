/* eslint-disable camelcase */
import { useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'

// third imports
import dayjs from 'dayjs'

// ant imports
import { Flex, Row } from 'antd'

// project  imports
import useConfig from '../hooks/useConfig'
import { WorldGlobe } from '../ui-components/WorldGlobe'
import FilterWeather from './components/FilterWeather'
import MainLayout from './MainLayout'

// services
import { BASE_URL_API, KEY_API, KEY_GOOGLE_API } from '../config'
import { apiCall } from '../utils/apiFunctions'

const Main = () => {
  const { units } = useConfig()

  const [search, setSearch] = useState(null)
  const [view, setView] = useState(dayjs(new Date()).format('YYYY-MM-DD'))

  const [loading, setLoading] = useState(true)
  const [todayData, setTodayData] = useState({})
  const [nextData, setNextData] = useState({})
  const [position, setPosition] = useState({
    cords: {
      lng: -99.1461,
      lat: 19.3823
    },
    title: 'Ciudad de México, México'
  })

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

  const infoWorld = useMemo(() => {
    return {
      position: todayData?.coord,
      country: todayData?.sys?.country
    }
  }, [todayData?.coord, todayData?.sys?.country])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const dataGoogle = await apiCall({ url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&result_type=postal_code&key=' + KEY_GOOGLE_API })
        if (dataGoogle?.status === 'OK') {
          if (dataGoogle?.results.length > 0) {
            const title = `${dataGoogle.results[0].address_components[2].long_name}, ${dataGoogle.results[0].address_components[3].long_name}, ${dataGoogle.results[0].address_components[4].long_name}`
            setPosition({ cords: { lat: position.coords.latitude, lng: position.coords.longitude }, title })
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (search && search.place_id) {
        const dataGoogle = await apiCall({ url: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + search.place_id + '&key=' + KEY_GOOGLE_API })
        console.log(dataGoogle)
        if (dataGoogle?.status === 'OK') {
          if (dataGoogle?.results.length > 0) {
            const { structured_formatting: { main_text } } = search
            const title = main_text

            setPosition({ cords: dataGoogle.results[0].geometry.location, title })
          }
        }
      }
    })()
  }, [search])

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

  return (
    <MainLayout setSearch={setSearch}>
      <Flex style={{ position: 'relative', maxWidth: '50%', width: '100%', minWidth: '50%', zIndex: 10 }}>
        {!loading && <WorldGlobe position={infoWorld.position} country={infoWorld.country} />}
      </Flex>
      <Row justify='end'>
        <Flex
          vertical style={{
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            position: 'relative',
            justifyContent: 'end',
            alignItems: 'end'
          }}
        >
          <FilterWeather view={view} setView={setView} />
          <Outlet context={[todayData, position, loading, dataViews, view]} />
        </Flex>
      </Row>
    </MainLayout>
  )
}

export default Main
