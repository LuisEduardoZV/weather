import PropTypes from 'prop-types'

// ant
import { MoonFilled, StarFilled } from '@ant-design/icons'
import { Button, Col, Input, Layout, Row, Space, Typography, theme } from 'antd'

// project imports
import useConfig from '../../hooks/useConfig'

const { Header } = Layout
const { Title } = Typography
const { useToken } = theme

const NavHeader = ({ search, setSearch }) => {
  const { token } = useToken()

  const { units, onChangeUnits, locale, onChangeLocale } = useConfig()

  const handleChangeUnit = (val) => {
    onChangeUnits(val)
  }

  const handleGhangeLocale = () => {
    onChangeLocale(locale === 'light' ? 'dark' : 'light')
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: token.colorPrimaryBg
      }}
    >
      <Row align='middle' style={{ paddingInline: 10 }}>
        <Col xs={8}>
          <Title level={3}>Aclimatate</Title>
        </Col>
        <Col xs={13} push={3}>
          <Input placeholder='Buscar por ciudad o códig postal' value={search} onChange={handleChangeSearch} style={{ maxWidth: '70%', paddingRight: 30 }} />
        </Col>
        <Col xs={3} style={{ alignItems: 'center' }}>
          <Space>
            <Button type={units === 'imperial' ? 'default' : 'text'} shape='circle' onClick={() => handleChangeUnit('imperial')}>
              °F
            </Button>
            <Button type={units === 'metrics' ? 'default' : 'text'} shape='circle' onClick={() => handleChangeUnit('metrics')}>
              °C
            </Button>
            <Button shape='round' icon={locale === 'light' ? <MoonFilled /> : <StarFilled />} onClick={handleGhangeLocale} />
          </Space>
        </Col>
      </Row>
    </Header>
  )
}

NavHeader.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func
}

export default NavHeader