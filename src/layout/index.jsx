import { Outlet } from 'react-router-dom'

// ant imports
import { Col, Input, Layout, Row } from 'antd'

const { Header, Content, Footer } = Layout

const MainLayout = () => {
  return (
    <Layout style={{
      display: 'flex',
      width: '100%',
      margin: 0,
      padding: 0,
      minHeight: '100vh'
    }}
    >
      <Header
        style={{
          margin: 0,
          padding: 0,
          width: '100%'
        }}
      >
        <Row style={{
          backgroundColor: 'white'
        }}
        >
          <Col xs={8}>
            Climador
          </Col>
          <Col xs={8}>
            <Input size='large' placeholder='Buscar por ciudad o códig postal' />
          </Col>
          <Col xs={8}>
            Extras
          </Col>
        </Row>
      </Header>
      <Content style={{
        padding: '0 48px',
        backgroundColor: 'white'
      }}
      >
        <Outlet />
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
