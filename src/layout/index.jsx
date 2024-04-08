import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

// third imports

// ant imports
import { Layout, Row } from 'antd'

// project  imports
import { WorldGlobe } from '../ui-components/WorldGlobe'
import FilterWeather from './components/FilterWeather'
import NavHeader from './components/NavHeader'

// services
import { BASE_URL_API, KEY_API, KEY_GOOGLE_API } from '../config'
import { apiCall } from '../utils/apiFunctions'

const { Content, Footer } = Layout

const MainLayout = () => {
  const [search, setSearch] = useState('')
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
      try {
        if (position?.cords) {
          const response = await apiCall({ url: `${BASE_URL_API}/weather?lat=${position?.cords?.lat}&lon=${position?.cords?.lng}&appid=${KEY_API}&units=metric` })
          setTodayData(response)

          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    return () => setLoading(true)
  }, [position])

  if (loading) return null
  return (
    <Layout style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }}
    >
      <NavHeader search={search} setSearch={setSearch} />
      <Content style={{ maxWidth: '80%', width: '100%', position: 'relative' }}>
        <FilterWeather view={view} setView={setView} />
        <div style={{ position: 'relative' }}>
          <WorldGlobe position={todayData?.coord} country={todayData?.sys?.country} />
        </div>
        <Row>
          <Outlet context={[search, setSearch, todayData, position]} />
        </Row>
      </Content>
      <Footer style={{
        textAlign: 'center',
        width: '100%',
        backgroundColor: 'white'
      }}
      >
        Pie
      </Footer>
    </Layout>
  )
}

export default MainLayout
