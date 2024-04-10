/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

// third imports

// ant imports
import { Row } from 'antd'

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
  const [view, setView] = useState('today')

  const [loading, setLoading] = useState(true)
  const [todayData, setTodayData] = useState({})
  const [position, setPosition] = useState(null)

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
      if (position?.cords) {
        const resToday = apiCall({ url: `${BASE_URL_API}/weather?lat=${position?.cords?.lat}&lon=${position?.cords?.lng}&appid=${KEY_API}&units=${units.type}` })
        const airToday = apiCall({ url: `${BASE_URL_API}/air_pollution?lat=${position?.cords?.lat}&lon=${position?.cords?.lng}&appid=${KEY_API}` })


        Promise.all([resToday, airToday]).then((values) => {
          if (Array.isArray(values) && values.length > 1) {
            setTodayData({ ...values[0], air: { ...values[1] } })
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }

    return () => setLoading(true)
  }, [position, units.type])

  return (
    <MainLayout setSearch={setSearch}>
      <div style={{ position: 'relative', maxWidth: '50%' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50%',
          height: '50vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          transform: 'translate(-50%,20%)',
          boxShadow: '2.9px 3.6px 1.2px rgba(0, 0, 0, 0.015),6.5px 8px 2.7px rgba(0, 0, 0, 0.022),10.8px 13.4px 4.6px rgba(0, 0, 0, 0.027),16.3px 20.2px 6.9px rgba(0, 0, 0, 0.031),23.5px 29.2px 10px rgba(0, 0, 0, 0.035),33.3px 41.3px 14.2px rgba(0, 0, 0, 0.039),47.2px 58.6px 20.1px rgba(0, 0, 0, 0.043),68.6px 85px 29.2px rgba(0, 0, 0, 0.048),105.8px 131.1px 45px rgba(0, 0, 0, 0.055),188px 233px 80px rgba(0, 0, 0, 0.07)',
          borderRadius: '50%',
          padding: 0,
          margin: 0
        }}
        />
        {!loading && <WorldGlobe position={todayData?.coord} country={todayData?.sys?.country} />}
      </div>
      <Row justify='end'>
        <FilterWeather view={view} setView={setView} />
        <Outlet context={[todayData, position, loading]} />
      </Row>
    </MainLayout>
  )
}

export default Main
