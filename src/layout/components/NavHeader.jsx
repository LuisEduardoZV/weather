import { useLoadScript } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import { useState } from 'react'

// ant
import { IconMenu2, IconMoonStars, IconSunFilled, IconTemperatureCelsius, IconTemperatureFahrenheit } from '@tabler/icons-react'
import { Button, Col, Divider, Drawer, Flex, Grid, Layout, Row, Typography, theme } from 'antd'

// project imports
import logo from '../../assets/img/appIcon.svg'
import { KEY_GOOGLE_API, NAME_APP } from '../../config'
import useConfig from '../../hooks/useConfig'
import AutocompletePlaces from '../../ui-components/AutocompletePlace'
import FooterCustom from './FooterCustom'


const { Header } = Layout
const { Title } = Typography
const { useToken } = theme
const { useBreakpoint } = Grid

const LIBRARIES_MAPS = ['places']

const NavHeader = ({ setSearch }) => {
  const { token } = useToken()
  const [modal, setModal] = useState(false)
  const { lg } = useBreakpoint()

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

  const handleCancel = () => {
    setModal(false)
  }

  const showModal = () => {
    setModal(true)
  }

  return (
    <Header
      className='header'
      style={{
        backgroundColor: token.colorBgLayout,
        width: '100%',
        boxShadow: '0.9px 2.2px 1.8px rgba(0, 0, 0, 0.009),2.2px 5.5px 4.4px rgba(0, 0, 0, 0.013),4.4px 11.2px 9px rgba(0, 0, 0, 0.017),9.1px 23px 18.6px rgba(0, 0, 0, 0.021),25px 63px 51px rgba(0, 0, 0, 0.03)',
        zIndex: 10
      }}
    >
      <Row align='center' justify='center' style={{ width: '100%', height: '100%' }}>
        <Col xs={18} sm={6} lg={8} className='titleNav'>
          <Flex align='center' justify='start' style={{ gap: 15, height: '100%' }}>
            <img alt='My weather app icon' src={logo} style={{ maxWidth: '15%', mixBlendMode: 'multiply' }} />
            <Title level={3} style={{ margin: 0 }}>{NAME_APP}</Title>
          </Flex>
        </Col>

        <Col xs={0} sm={12} lg={12} span={lg ? 2 : 0}>
          {isLoaded && <AutocompletePlaces setSearch={setSearch} />}
        </Col>

        <Col xs={6} sm={0}>
          <Flex align='center' justify='end' style={{ height: '100%' }}>
            <Button
              size='small'
              onClick={showModal}
              icon={<IconMenu2 size={15} />}
            />
          </Flex>

          <Drawer title='Menu' onClose={handleCancel} open={modal}>
            <Row style={{ width: '100%', gap: 30, justifyContent: 'center' }}>
              <Col xs={24}>
                {isLoaded && <AutocompletePlaces setSearch={setSearch} subMenu />}
              </Col>

              <Col xs={12}>
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
            <Divider style={{ margin: 0, backgroundColor: token.colorPrimaryBg, marginTop: 20, marginBottom: 20, width: 1 }} />
            <Row style={{ width: '100%' }}>
              <FooterCustom inSubMenu />
            </Row>
          </Drawer>
        </Col>

        <Col xs={0} sm={6} lg={4}>
          <Flex style={{ alignItems: 'center', justifyContent: 'start', height: '100%', gap: 10 }}>
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
