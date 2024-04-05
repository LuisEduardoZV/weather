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
import { BASE_URL_API, KEY_API } from '../config'
import { apiCall } from '../utils/apiFunctions'

const { Content, Footer } = Layout

const MainLayout = () => {
  const [search, setSearch] = useState('')
  const [view, setView] = useState('today')

  const [loading, setLoading] = useState(true)
  const [todayData, setTodayData] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const response = await apiCall({ url: `${BASE_URL_API}/weather?q=mexico&appid=${KEY_API}&units=metric` })
        setTodayData(response)

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => setLoading(true)
  }, [])

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
          <WorldGlobe position={todayData?.coord} country={todayData?.name} />
        </div>
        <Row>
          <Outlet context={[search, setSearch, todayData]} />
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
