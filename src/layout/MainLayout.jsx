import PropTypes from 'prop-types'

// ant
import { Flex, Layout, theme } from 'antd'

// project
import FooterCustom from './components/FooterCustom'
import NavHeader from './components/NavHeader'

const { Content, Footer } = Layout
const { useToken } = theme

const MainLayout = ({ children, setSearch }) => {
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
      <NavHeader setSearch={setSearch} />
      <Content style={{
        maxWidth: '100%',
        width: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        boxShadow: '0.9px 2.2px 1.8px rgba(0, 0, 0, 0.009),2.2px 5.5px 4.4px rgba(0, 0, 0, 0.013),4.4px 11.2px 9px rgba(0, 0, 0, 0.017),9.1px 23px 18.6px rgba(0, 0, 0, 0.021),25px 63px 51px rgba(0, 0, 0, 0.03)'
      }}
      >
        <Flex
          vertical style={{
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            position: 'relative'
          }}
        >
          {children}
        </Flex>
      </Content>
      <Footer style={{
        textAlign: 'center',
        width: '100%',
        background: token.colorBgBase
      }}
      >
        <FooterCustom />
      </Footer>
    </Layout>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node,
  setSearch: PropTypes.func
}

export default MainLayout
