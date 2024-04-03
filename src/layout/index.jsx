import { useState } from 'react'
import { Outlet } from 'react-router-dom'

// ant imports
import { Layout } from 'antd'

// project  imports
import NavHeader from './components/NavHeader'

const { Content, Footer } = Layout

const MainLayout = () => {
  const [search, setSearch] = useState('')

  return (
    <Layout style={{
      minHeight: '100vh'
    }}
    >
      <NavHeader search={search} setSearch={setSearch} />
      <Content>
        <Outlet context={[search, setSearch]} />
      </Content>
      <Footer style={{
        textAlign: 'center'
      }}
      >
        Pie
      </Footer>
    </Layout>
  )
}

export default MainLayout
