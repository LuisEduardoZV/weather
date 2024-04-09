import PropTypes from 'prop-types'
import { useState } from 'react'

// ant
import { Layout, theme } from 'antd'

// project
import NavHeader from './components/NavHeader'

const { Content, Footer } = Layout
const { useToken } = theme

const MainLayout = ({ children }) => {
  const [search, setSearch] = useState('')
  const { token } = useToken()

  return (
    <Layout style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: token.colorBgBase,
      position: 'relative'
    }}
    >
      <NavHeader search={search} setSearch={setSearch} />
      <Content style={{
        maxWidth: '100%',
        width: '100%',
        position: 'relative',
        backgroundColor: 'transparent'
      }}
      >
        {children}
      </Content>
      <Footer style={{
        textAlign: 'center',
        width: '100%',
        backgroundColor: token.colorBgBase
      }}
      >
        Pie
      </Footer>
    </Layout>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
