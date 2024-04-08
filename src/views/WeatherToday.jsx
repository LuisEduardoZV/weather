import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'

// ant
import { IconCloudFog, IconGauge } from '@tabler/icons-react'
import { Col, Flex, Row, Typography, theme } from 'antd'

// project imports
import useConfig from '../hooks/useConfig'
import MainWeatherToday from './components/MainWeatherToday'

import weather from '../utils/data/weathers.json'
import { iconsWeather } from '../utils/iconWeather'

const { Title, Text } = Typography
const { useToken } = theme

const WeatherToday = () => {
  const [, , todayData, position] = useOutletContext()
  const { token } = useToken()
  const { units } = useConfig()

  const infoWeather = useMemo(() => {
    const clima = todayData?.weather[0]
    const desc = weather[clima?.id ?? 200]
    const icons = iconsWeather[todayData.weather[0].icon ?? '01d']
    return { desc, icons }
  }, [todayData])

  return (
    <Flex style={{ position: 'relative', justifyContent: 'end', width: '100%', paddingRight: 40, flexDirection: 'column', alignItems: 'end' }}>
      <Row style={{ maxWidth: '50%', width: '100%', marginTop: 80, padding: 0 }}>
        <Col
          xs={24} style={{
            position: 'relative',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.013)',
            margin: 0,
            borderRadius: 4,
            minHeight: 130,
            height: '100%',
            boxShadow: '0.9px 2.2px 1.8px rgba(0, 0, 0, 0.009),2.2px 5.5px 4.4px rgba(0, 0, 0, 0.013),4.4px 11.2px 9px rgba(0, 0, 0, 0.017),9.1px 23px 18.6px rgba(0, 0, 0, 0.021),25px 63px 51px rgba(0, 0, 0, 0.03)'
          }}
        >
          <MainWeatherToday data={todayData.main} title={position.title} />
        </Col>
      </Row>

      <Row style={{ maxWidth: '50%', width: '100%', marginTop: 60, padding: 0, gap: '6%' }}>

        <Col
          xs={7} style={{
            margin: 0,
            borderRadius: 4,
            minHeight: 120,
            height: '100%'
          }}
        >
          <Flex style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            position: 'relative'
          }}
          >
            <IconGauge
              color={token.colorPrimary}
              size={70}
              style={
        {
          opacity: 1,
          zIndex: 10,
          filter: `drop-shadow(4.5px 4.5px 4.9px ${token.colorPrimary})`
        }
      }
            />
            <Text type='secondary' style={{ margin: 0, padding: 0, marginTop: 10 }}>Presión</Text>
            <Title level={5} style={{ margin: 0, padding: 0 }}>{todayData.main.pressure} {units.press}</Title>
          </Flex>
        </Col>

        <Col
          xs={7} style={{
            margin: 0,
            borderRadius: 4,
            minHeight: 120,
            height: '100%'
          }}
        >
          <Flex style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            position: 'relative'
          }}
          >
            {
              Array.isArray(infoWeather.icons) && infoWeather.icons.map((i, key) => {
                const Icon = i
                const type = key % 2 !== 0
                return (
                  <Icon
                    key={key}
                    color={type ? token.grey300 : token.colorIcon}
                    size={70}
                    {...((type) && {
                      style: {
                        position: 'absolute',
                        right: '52%',
                        top: '5%',
                        transform: 'translateX(50%)',
                        opacity: 1,
                        zIndex: 10,
                        filter: `drop-shadow(4.5px 4.5px 4.9px ${token.grey400})`
                      }
                    })}
                  />
                )
              })
            }
            <Text type='secondary' style={{ margin: 0, padding: 0, marginTop: 10 }}>Condiciones</Text>
            <Title level={5} style={{ margin: 0, padding: 0 }}>{infoWeather.desc}</Title>
          </Flex>
        </Col>

        <Col
          xs={7} style={{
            margin: 0,
            borderRadius: 4,
            minHeight: 120,
            height: '100%'
          }}
        >
          <Flex style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            position: 'relative'
          }}
          >
            <IconCloudFog
              color={token.colorInfo}
              size={70}
              style={
                {
                  opacity: 1,
                  zIndex: 10,
                  filter: `drop-shadow(4.5px 4.5px 4.9px ${token.colorInfo})`
                }
              }
            />
            <Text type='secondary' style={{ margin: 0, padding: 0, marginTop: 10 }}># Nubes</Text>
            <Title level={5} style={{ margin: 0, padding: 0 }}>{todayData.clouds.all}</Title>
          </Flex>
        </Col>
      </Row>

      <Row style={{ width: '100%', marginTop: 90, padding: 0, gap: '6%', height: 400 }}>
        asdasd
      </Row>
    </Flex>
  )
}
export default WeatherToday
