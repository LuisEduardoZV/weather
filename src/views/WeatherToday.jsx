import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'

import dayjs from 'dayjs'

// ant
import { IconArrowBigLeftLine, IconCloudFog, IconGauge, IconSunrise, IconSunset, IconWhirl, IconWind } from '@tabler/icons-react'
import { Col, Flex, Row, Typography, theme } from 'antd'

// project imports
import useConfig from '../hooks/useConfig'
import Card from '../ui-components/Card'
import { HoverEffect } from '../ui-components/extended/CardHoverEffect'
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

  const contamination = useMemo(() => {
    const info = todayData.air.list[0].components
    const respose = []
    for (const key in info) {
      if (Object.hasOwnProperty.call(info, key)) {
        const element = info[key]
        respose.push({
          title: key?.toUpperCase()?.replace(/[^a-zA-Z]/g, ''),
          value: element,
          sufix: 'μg/m3',
          elevation: key?.match(/[^a-zA-Z]/g)?.join('')?.replace('_', '.') ?? null
        })
      }
    }
    return respose
  }, [todayData])

  return (
    <Flex style={{ position: 'relative', justifyContent: 'end', width: '100%', paddingRight: 0, flexDirection: 'column', alignItems: 'end' }}>
      <Row style={{ maxWidth: '60%', width: '100%', marginTop: 50, padding: 0, paddingInline: '10%' }}>
        <Col
          xs={24} style={{
            position: 'relative',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.013)',
            margin: 0,
            minHeight: 130,
            height: '100%'
          }}
        >
          <MainWeatherToday data={todayData.main} title={position.title} />
        </Col>
      </Row>
      <Row style={{ maxWidth: '60%', width: '100%', paddingInline: '10%', marginTop: 60 }}>
        <HoverEffect>
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
        </HoverEffect>
      </Row>

      <Flex vertical style={{ width: '100%', alignItems: 'end', backgroundColor: token.colorPrimary, paddingTop: 50, marginTop: 60, paddingBottom: 50 }}>

        <Row style={{ width: '100%', padding: 0, justifyContent: 'space-between', alignItems: 'end', paddingInline: '10%' }}>
          <Col xs={4}>
            <Card vertical style={{ position: 'relative', padding: 10, backgroundColor: token.colorPrimary, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
              <div className='circle'>
                <div className='wave' style={{ backgroundColor: token.colorPrimaryBg }} />
              </div>
              <Flex vertical align='center' style={{ zIndex: 2, height: '100%', margin: 0, gap: 15 }}>
                <Title level={5} type='secondary' style={{ margin: 0 }}>Nivel del Mar</Title>
                <Text strong italic>{todayData.main.sea_level} {units.press}</Text>
              </Flex>
            </Card>
          </Col>
          <Col xs={4} style={{ position: 'relative' }}>
            <Card vertical style={{ position: 'relative', padding: 10, justifyContent: 'center', backgroundColor: token.colorPrimaryBg, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
              <Row>
                <Col xs={12}>
                  <Flex vertical align='center' justify='space-between' gap={10}>
                    <IconSunrise
                      style={{
                        width: 45,
                        color: token.colorWarningActive,
                        transition: 'transform 0.3s ease-in-out, margin 0.3s ease-in-out'
                      }}
                      className='iconsunset'
                    />
                    <Text italic>
                      {dayjs(new Date(todayData.sys.sunrise * 1000)).format('HH:mm')}
                    </Text>
                  </Flex>
                </Col>
                <Col xs={12}>
                  <Flex vertical align='center' justify='space-between' gap={10}>
                    <IconSunset
                      style={{
                        width: 45,
                        color: token.colorWarningActive,
                        transition: 'transform 0.3s ease-in-out, margin 0.3s ease-in-out'
                      }}
                      className='iconsunset'
                    />
                    <Text italic>{dayjs(new Date(todayData.sys.sunset * 1000)).format('HH:mm')}</Text>
                  </Flex>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={11}>
            <Card vertical style={{ position: 'relative', padding: 10, backgroundColor: token.colorPrimaryBg, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
              <div id='Clouds'>
                <div className='Cloud Foreground' />
                <div className='Cloud Background' />
                <div className='Cloud Foreground' />
                <div className='Cloud Background' />
                <div className='Cloud Foreground' />
                <div className='Cloud Background' />
                <div className='Cloud Background' />
                <div className='Cloud Foreground' />
                <div className='Cloud Background' />
                <div className='Cloud Background' />
              </div>
              <Title level={3} type='secondary' style={{ margin: 0 }}>Viento</Title>
              <Flex style={{ zIndex: 2, justifyContent: 'space-between', marginTop: 10 }}>
                <Flex vertical align='center'>
                  <IconWind color={token.colorPrimary} />
                  <Text italic style={{ fontWeight: 500 }}>{todayData.wind.speed} {units.wind}</Text>
                </Flex>
                <Flex vertical align='center'>
                  <IconArrowBigLeftLine style={{ transform: `rotate(${todayData.wind.deg}deg)` }} color={token.colorPrimary} />
                  <Text italic style={{ fontWeight: 500 }}>{todayData.wind.deg} °</Text>
                </Flex>
                <Flex vertical align='center'>
                  <IconWhirl color={token.colorPrimary} />
                  <Text italic style={{ fontWeight: 500 }}>{todayData.wind.gust} {units.wind}</Text>
                </Flex>
              </Flex>
            </Card>
          </Col>
        </Row>

        <Row style={{ width: '100%', paddingInline: 50, paddingTop: 50 }} justify='center'>
          <Col xs={24}>
            <Flex style={{ width: '100%' }}>
              <Title style={{ marginTop: 10, color: token.colorTextLightSolid }}>Contaminación atmosférica</Title>
            </Flex>
          </Col>
          <Col xs={12} style={{ marginTop: 50 }}>
            <Row style={{ width: '100%', justifyContent: 'space-between', rowGap: 20 }}>
              {contamination.map((op, index) => (
                <Col key={index} xs={7}>
                  <Flex
                    vertical align='center' justify='center'
                    className='cardAir'
                  >
                    <Title level={3} style={{ margin: 0 }}>{op.title}</Title>
                    <Text>{op.value} {op.sufix}</Text>
                  </Flex>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Flex>
    </Flex>
  )
}
export default WeatherToday
