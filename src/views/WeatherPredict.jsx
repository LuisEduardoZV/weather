import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'

// third
import dayjs from 'dayjs'

// ant
import { IconTemperature, IconTemperatureMinus, IconTemperaturePlus, IconThermometer } from '@tabler/icons-react'
import { Col, Flex, Row, Typography, theme } from 'antd'

// project
import { HoverEffect } from '../ui-components/extended/CardHoverEffect'
import AirPolution from './components/AirPolution'
import CardsInfo from './components/CardsInfo'
import MainWeatherToday from './components/MainWeatherToday'

import useConfig from '../hooks/useConfig'
import weather from '../utils/data/weathers.json'
import { getIcon } from '../utils/iconWeather'

const { Title, Text } = Typography
const { useToken } = theme

const WeatherPredict = () => {
  const [, position, loading, nextData, view] = useOutletContext()
  const { token } = useToken()
  const { units } = useConfig()

  const promedioInfo = useMemo(() => {
    const info = {
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0
      },
      wind: {
        speed: 0,
        deg: 0,
        gust: 0
      }
    }

    if (nextData.weather && nextData.weather[view]) {
      const currentData = nextData.weather[view]
      currentData.forEach(op => {
        const { main, wind } = op
        info.main.temp += main.temp
        info.main.feels_like += main.feels_like
        info.main.temp_min += main.temp_min
        info.main.temp_max += main.temp_max

        info.wind.speed += wind.speed
        info.wind.deg += wind.deg
        info.wind.gust += wind.gust
      })

      const tam = currentData.length

      info.main.temp /= tam
      info.main.feels_like /= tam
      info.main.temp_min /= tam
      info.main.temp_max /= tam

      info.wind.speed /= tam
      info.wind.deg /= tam
      info.wind.gust /= tam
    }

    return info
  }, [nextData, view])

  const airMedInfo = useMemo(() => {
    const info = {
      components: {
        co: 0,
        no: 0,
        no2: 0,
        o3: 0,
        so2: 0,
        pm2_5: 0,
        pm10: 0,
        nh3: 0
      }
    }

    if (nextData.air) {
      const currentData = nextData.air[view]
      currentData.forEach(op => {
        const { components } = op
        for (const key in components) {
          if (Object.hasOwnProperty.call(components, key)) {
            const element = components[key]
            info.components[key] += element
          }
        }
      })

      const tam = currentData.length

      for (const key in info) {
        if (Object.hasOwnProperty.call(info, key)) info.components[key] /= tam
      }
    }

    delete info.components?.components

    const respose = []
    for (const key in info.components) {
      if (Object.hasOwnProperty.call(info.components, key)) {
        const element = info.components[key]
        respose.push({
          title: key?.toUpperCase()?.replace(/[^a-zA-Z]/g, ''),
          value: element,
          sufix: 'μg/m3',
          elevation: key?.match(/[^a-zA-Z]/g)?.join('')?.replace('_', '.') ?? null
        })
      }
    }

    return respose
  }, [nextData, view])

  const mainData = useMemo(() => {
    const { weather } = nextData
    if (weather && nextData.weather[view]) return nextData.weather[view]
    return []
  }, [nextData, view])

  return (
    <Flex style={{ position: 'relative', justifyContent: 'end', width: '100%', paddingRight: 0, flexDirection: 'column', alignItems: 'end' }}>
      <Row style={{ maxWidth: '60%', width: '100%', marginTop: 50, padding: 0, paddingInline: '10%', marginBottom: 90 }}>
        <MainWeatherToday data={promedioInfo.main} title={position?.title} loading={loading} aprox />
      </Row>

      <CardsInfo data={promedioInfo} aprox />

      <Flex vertical style={{ width: '100%', alignItems: 'end', backgroundColor: token.colorPrimary, paddingTop: 30, marginTop: 100, paddingBottom: 50 }}>

        <Row style={{ width: '100%', paddingInline: 50, paddingTop: 10 }} justify='center'>
          <Col xs={24}>
            <Flex style={{ width: '100%' }}>
              <Title style={{ marginTop: 10, color: token.colorTextLightSolid }}>Clima por hora</Title>
            </Flex>
          </Col>
          <HoverEffect aprox>
            {mainData.map((op, ind) => {
              const infoWeather = { desc: '', icons: [] }
              const clima = op?.weather[0]
              infoWeather.desc = weather[clima?.id ?? 200]
              infoWeather.infoIcons = getIcon(token, op?.weather[0]?.icon ?? '01d')

              return (
                <Row key={ind} className='transition-all weather-peer-hour' style={{ width: '100%', padding: 10, borderRadius: 8, minHeight: 100, transitionDelay: '0s' }}>
                  <Col xs={24} style={{}}>
                    <Row style={{ width: '100%' }}>
                      <Col xs={24}>
                        <Title level={5} style={{ margin: 0 }} className='transition-all weather-peer-hour-title'>{dayjs(op.dt_txt).format('hh:mm A')}</Title>
                      </Col>
                    </Row>
                    <Row justify='end' align='end'>
                      <Col xs={4} className='col-table'>
                        <Flex vertical justify='center' align='center' style={{ position: 'relative' }}>
                          <Text italic className='transition-all weather-peer-hour-value'>{op.main.temp} °{units.temp}</Text>
                          <Flex justify='center' align='center'>
                            <IconTemperature className='transition-all weather-peer-hour-icon' /> <Text strong className='transition-visible weather-peer-hour-subtitle'>Temperatura</Text>
                          </Flex>
                        </Flex>
                      </Col>
                      <Col xs={5} className='col-table'>
                        <Flex vertical justify='center' align='center'>
                          <Text italic className='transition-all weather-peer-hour-value'>{op.main.temp_max} °{units.temp}</Text>
                          <Flex justify='center' align='center'>
                            <IconTemperaturePlus className='transition-all weather-peer-hour-icon' /> <Text strong className='transition-visible weather-peer-hour-subtitle'>Temp. Máxima</Text>
                          </Flex>
                        </Flex>
                      </Col>
                      <Col xs={5} className='col-table'>
                        <Flex vertical justify='center' align='center'>
                          <Text italic className='transition-all weather-peer-hour-value'>{op.main.temp_min} °{units.temp}</Text>
                          <Flex justify='center' align='center'>
                            <IconTemperatureMinus className='transition-all weather-peer-hour-icon' />
                            <Text strong className='transition-visible weather-peer-hour-subtitle'>Temp. Mínima</Text>
                          </Flex>
                        </Flex>
                      </Col>
                      <Col xs={5} className='col-table'>
                        <Flex vertical justify='center' align='center'>
                          <Text italic className='transition-all weather-peer-hour-value'>{op.main.feels_like} °{units.temp}</Text>
                          <Flex justify='center' align='center'>
                            <IconThermometer className='transition-all weather-peer-hour-icon' />
                            <Text strong className='transition-visible weather-peer-hour-subtitle'>Temp. Ambiente</Text>
                          </Flex>
                        </Flex>
                      </Col>
                      <Col xs={5} className='col-table'>
                        <Flex style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '70%',
                          alignItems: 'center',
                          position: 'relative'
                        }}
                        >
                          {
                            Array.isArray(infoWeather?.infoIcons?.icons) && infoWeather.infoIcons.icons.map((i, key) => {
                              const Icon = i
                              const style = infoWeather?.infoIcons?.style
                              return (
                                <Icon
                                  key={key}
                                  size={50}
                                  color={(key === 0 && infoWeather?.infoIcons?.icons?.length === 2) ? token.grey400 : style.color}
                                  {...((key === 1)
                                    ? {
                                        style: {
                                          position: 'absolute',
                                          color: token.grey300,
                                          ...infoWeather?.infoIcons?.style,
                                          filter: `drop-shadow(4.5px 4.5px 4.9px ${token.grey400})`,
                                          opacity: 1,
                                          zIndex: 2
                                        }
                                      }
                                    : {
                                        style: {
                                          zIndex: 3,
                                          filter: `drop-shadow(4.5px 4.5px 4.9px ${token.grey400})`
                                        }
                                      })}
                                />
                              )
                            })
                          }
                          <Text className='transition-visible weather-peer-hour-subtitle position-subtitle-weather' style={{ top: '-40%', fontWeight: 600 }}>{infoWeather.desc}</Text>
                        </Flex>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )
            })}
          </HoverEffect>
        </Row>

        <AirPolution data={airMedInfo} />

      </Flex>
    </Flex>
  )
}

export default WeatherPredict
