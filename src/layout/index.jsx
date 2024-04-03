import { useState } from 'react'
import { Outlet } from 'react-router-dom'

// ant imports
import { Layout, Row } from 'antd'

// project  imports
import FilterWeather from './components/FilterWeather'
import NavHeader from './components/NavHeader'

const { Content, Footer } = Layout


const MainLayout = () => {
  const [search, setSearch] = useState('')
  const [view, setView] = useState('today')


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
      <Content style={{ maxWidth: '80%', width: '100%' }}>
        <FilterWeather view={view} setView={setView} />
        <Row>
          <Outlet context={[search, setSearch]} />
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
