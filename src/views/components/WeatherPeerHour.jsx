import PropTypes from 'prop-types'
import { useMemo } from 'react'

import dayjs from 'dayjs'

import { IconTemperature, IconTemperatureMinus, IconTemperaturePlus, IconThermometer } from '@tabler/icons-react'
import { Col, Flex, Row, Typography, theme } from 'antd'

import useConfig from '../../hooks/useConfig'
import Icon from '../../ui-components/Icon'
import weather from '../../utils/data/weathers.json'
import { getIcon } from '../../utils/iconWeather'

const { Title, Text } = Typography
const { useToken } = theme

const WeatherPeerHour = ({ data }) => {
  const { units } = useConfig()
  const { token } = useToken()

  const infoWeather = useMemo(() => {
    const info = { desc: '', icons: [] }
    if (!data) return info
    const clima = data?.weather[0]
    info.desc = weather[clima?.id ?? 200]
    info.infoIcons = getIcon(token, data?.weather[0]?.icon ?? '01d')
    return info
  }, [data, token])

  return (
    <Row className='transition-all weather-peer-hour' style={{ width: '100%', padding: 10, borderRadius: 8, minHeight: 100, transitionDelay: '0s' }}>
      <Col xs={24} style={{}}>
        <Row style={{ width: '100%' }}>
          <Col xs={24}>
            <Title level={5} style={{ margin: 0 }} className='transition-all weather-peer-hour-title'>{dayjs(data.dt_txt).format('hh:mm A')}</Title>
          </Col>
        </Row>
        <Row justify='end' align='end' style={{ rowGap: 40 }}>
          <Col xs={8} sm={4} className='col-table'>
            <Flex vertical justify='center' align='center' style={{ position: 'relative' }}>
              <Text italic className='transition-all weather-peer-hour-value'>{data.main.temp} °{units.temp}</Text>
              <Flex justify='center' align='center'>
                <IconTemperature className='transition-all weather-peer-hour-icon' /> <Text strong className='transition-visible weather-peer-hour-subtitle'>Temperatura</Text>
              </Flex>
            </Flex>
          </Col>
          <Col xs={8} sm={5} className='col-table'>
            <Flex vertical justify='center' align='center'>
              <Text italic className='transition-all weather-peer-hour-value'>{data.main.temp_max} °{units.temp}</Text>
              <Flex justify='center' align='center'>
                <IconTemperaturePlus className='transition-all weather-peer-hour-icon' /> <Text strong className='transition-visible weather-peer-hour-subtitle'>Temp. Máxima</Text>
              </Flex>
            </Flex>
          </Col>
          <Col xs={8} sm={5} className='col-table'>
            <Flex vertical justify='center' align='center'>
              <Text italic className='transition-all weather-peer-hour-value'>{data.main.temp_min} °{units.temp}</Text>
              <Flex justify='center' align='center'>
                <IconTemperatureMinus className='transition-all weather-peer-hour-icon' />
                <Text strong className='transition-visible weather-peer-hour-subtitle'>Temp. Mínima</Text>
              </Flex>
            </Flex>
          </Col>
          <Col xs={12} sm={5} className='col-table'>
            <Flex vertical justify='center' align='center'>
              <Text italic className='transition-all weather-peer-hour-value'>{data.main.feels_like} °{units.temp}</Text>
              <Flex justify='center' align='center'>
                <IconThermometer className='transition-all weather-peer-hour-icon' />
                <Text strong className='transition-visible weather-peer-hour-subtitle'>Temp. Ambiente</Text>
              </Flex>
            </Flex>
          </Col>
          <Col xs={12} sm={5} className='col-table'>
            <Flex style={{
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
              alignItems: 'center',
              position: 'relative'
            }}
            >
              {Array.isArray(infoWeather?.infoIcons?.icons) && infoWeather.infoIcons.icons.map((op, key) => (
                <Icon
                  key={key}
                  idx={key}
                  style={infoWeather?.infoIcons?.style}
                  length={infoWeather?.infoIcons?.icons?.length}
                  option={op}
                />
              ))}
              <Text className='transition-visible weather-peer-hour-subtitle position-subtitle-weather' style={{ top: '-40%', fontWeight: 600 }}>{infoWeather.desc}</Text>
            </Flex>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

WeatherPeerHour.propTypes = {
  data: PropTypes.object
}

export default WeatherPeerHour
