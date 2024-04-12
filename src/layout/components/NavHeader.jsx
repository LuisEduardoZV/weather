import { useLoadScript } from '@react-google-maps/api'
import PropTypes from 'prop-types'

// ant
import { IconMoonStars, IconSunFilled, IconTemperatureCelsius, IconTemperatureFahrenheit } from '@tabler/icons-react'
import { Button, Col, Flex, Layout, Row, Typography, theme } from 'antd'

// project imports
import logo from '../../assets/img/appIcon.svg'
import { KEY_GOOGLE_API, NAME_APP } from '../../config'
import useConfig from '../../hooks/useConfig'
import AutocompletePlaces from '../../ui-components/AutocompletePlace'


const { Header } = Layout
const { Title } = Typography
const { useToken } = theme

const LIBRARIES_MAPS = ['places']

const NavHeader = ({ setSearch }) => {
  const { token } = useToken()

  const { isLoaded } = useLoadScript({ googleMapsApiKey: KEY_GOOGLE_API, libraries: LIBRARIES_MAPS })

  const { units, onChangeUnits, locale, onChangeLocale } = useConfig()

  const handleChangeUnit = (val) => {
    switch (val) {
      case 'imperial':
        onChangeUnits({
          type: 'imperial',
          temp: 'F',
          press: 'psi',
          wind: 'millas/hr'
        })
        break
      default:
        onChangeUnits({
          type: 'metric',
          temp: 'C',
          press: 'hPa',
          wind: 'm/s'
        })
        break
    }
  }

  const handleGhangeLocale = () => {
    onChangeLocale(locale === 'light' ? 'dark' : 'light')
  }

  return (
    <Header
      style={{
        backgroundColor: token.colorBgLayout,
        width: '100%',
        boxShadow: '0.9px 2.2px 1.8px rgba(0, 0, 0, 0.009),2.2px 5.5px 4.4px rgba(0, 0, 0, 0.013),4.4px 11.2px 9px rgba(0, 0, 0, 0.017),9.1px 23px 18.6px rgba(0, 0, 0, 0.021),25px 63px 51px rgba(0, 0, 0, 0.03)',
        minHeight: 70,
        zIndex: 10
      }}
    >
      <Row align='middle' justify='center' style={{ paddingBottom: 20, height: 'min-content' }}>
        <Col xs={8}>
          <Flex align='center' style={{ gap: 15 }}>
            <img alt='My weather app icon' src={logo} style={{ maxWidth: '15%', mixBlendMode: 'multiply' }} />
            <Title level={3} style={{ margin: 0 }}>{NAME_APP}</Title>
          </Flex>
        </Col>
        <Col xs={13} push={3}>
          {isLoaded && <AutocompletePlaces setSearch={setSearch} />}
        </Col>
        <Col xs={3}>
          <Flex style={{ alignItems: 'center', justifyContent: 'start', height: 'min-content', gap: 10 }}>
            <Button
              style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              type={units.type === 'imperial' ? 'primary' : 'text'}
              shape='circle'
              onClick={() => handleChangeUnit('imperial')}
            >
              <IconTemperatureFahrenheit color={units.type === 'imperial' ? token.colorPrimaryBg : token.colorPrimary} size={20} stroke={1.5} />
            </Button>
            <Button
              style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              type={units.type === 'metric' ? 'primary' : 'text'} shape='circle'
              onClick={() => handleChangeUnit('metric')}
            >
              <IconTemperatureCelsius color={units.type === 'metric' ? token.colorPrimaryBg : token.colorPrimary} size={20} stroke={1.5} />
            </Button>
            <Button
              shape='round'
              color={token.colorPrimary}
              style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
              icon={
              locale === 'light'
                ? <IconMoonStars color={token.colorPrimary} size={23} stroke={1.5} />
                : <IconSunFilled color={token.colorPrimary} size={23} stroke={1.5} />
              }
              onClick={handleGhangeLocale}
            />
          </Flex>
        </Col>
      </Row>
    </Header>
  )
}

NavHeader.propTypes = {
  setSearch: PropTypes.func
}

export default NavHeader
