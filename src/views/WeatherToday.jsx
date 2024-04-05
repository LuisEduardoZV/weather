import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'

// ant
import { Col, Flex, Row, Space, Typography, theme } from 'antd'

import { IconSun } from '@tabler/icons-react'
import { iconsWeather } from '../utils/iconWeather'

const { Title, Text } = Typography
const { useToken } = theme

const WeatherToday = () => {
  const [search, setSearch, todayData] = useOutletContext()
  const { token } = useToken()

  const icons = useMemo(() => (iconsWeather[todayData.weather[0].icon ?? '01d']), [todayData])

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
          <div style={{
            position: 'absolute',
            filter: 'blur(1px)',
            top: 0,
            left: 0,
            width: '100%',
            minHeight: 130,
            height: '100%',
            margin: 0,
            padding: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            zIndex: 0,
            content: ''
          }}
          />
          <Flex
            vertical style={{
              minHeight: 130,
              justifyContent: 'space-between',
              width: '100%',
              margin: 0,
              padding: 10,
              zIndex: 10,
              backgroundColor: 'transparent'
            }}
          >
            <Title level={4} style={{ margin: 0 }}>Cuauhtémoc, México a 14:35 CST</Title>
            <Space direction='horizontal' style={{ width: '100%', display: 'flex', gap: '15%' }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Text>Temperatura: {todayData.main.temp} °C</Text>
                <Text>Temperatura Máxima: {todayData.main.temp_max} °C</Text>
                <Text>Temperatura Mínima: {todayData.main.temp_min} °C</Text>
              </Space>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Text>Sensación térmica: {todayData.main.feels_like} °C</Text>
                <Text>Humedad: {todayData.main.humidity} %</Text>
              </Space>
              {/* <img alt='icon' src='https://openweathermap.org/img/wn/01n.png' />
            <img alt='icon' src='https://openweathermap.org/img/wn/02n.png' />
            <img alt='icon' src='https://openweathermap.org/img/wn/03n.png' />
        <img alt='icon' src='https://openweathermap.org/img/wn/04n.png' /> */}
            </Space>
          </Flex>
        </Col>
      </Row>

      <Row style={{ maxWidth: '50%', width: '100%', marginTop: 70, padding: 0, gap: '10%' }}>
        <Col
          xs={10} style={{
            margin: 0,
            borderRadius: 4,
            minHeight: 120,
            height: '100%'
          }}
        >
          <Flex style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '100%',
            alignItems: 'center',
            position: 'relative'
          }}
          >
            {
              Array.isArray(icons) && icons.map((i, key) => {
                const Icon = i
                const type = key % 2 !== 0
                console.log(token.colorTextDisabled)
                return (
                  <Icon
                    key={key}
                    color={type ? token.grey300 : token.colorIcon}
                    size={70}
                    {...((type) && {
                      style: {
                        position: 'absolute',
                        right: '52%',
                        top: '7%',
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
            <Title level={5} style={{ margin: 0, padding: 0 }}>{todayData.weather[0].description}</Title>
          </Flex>
        </Col>
      </Row>
    </Flex>
  )
}
export default WeatherToday
