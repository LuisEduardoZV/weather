import PropTypes from 'prop-types'

// third
import dayjs from 'dayjs'

// ant
import { IconArrowBigLeftLine, IconSunrise, IconSunset, IconWhirl, IconWind } from '@tabler/icons-react'
import { Col, Flex, Row, Typography, theme } from 'antd'

// project
import useConfig from '../../hooks/useConfig'
import Card from '../../ui-components/Card'

const { Title, Text } = Typography
const { useToken } = theme

const CardsInfo = ({ data, aprox = false }) => {
  const { token } = useToken()
  const { units } = useConfig()

  return (
    <Row style={{ width: aprox ? '60%' : '100%', padding: 0, justifyContent: 'space-between', alignItems: 'end', paddingInline: '10%' }}>
      {!aprox && (
        <>
          <Col xs={4}>
            <Card vertical style={{ position: 'relative', padding: 10, backgroundColor: token.colorPrimary, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
              <div className='circle'>
                <div className='wave' style={{ backgroundColor: token.colorBgBase }} />
              </div>
              <Flex vertical align='center' style={{ zIndex: 2, height: '100%', margin: 0, gap: 15 }}>
                <Title level={5} type='secondary' style={{ margin: 0 }}>Nivel del Mar</Title>
                <Text strong italic>{data?.main?.sea_level} {units.press}</Text>
              </Flex>
            </Card>
          </Col>
          <Col xs={4} style={{ position: 'relative' }}>
            <Card vertical style={{ position: 'relative', padding: 10, justifyContent: 'center', backgroundColor: token.colorBgBase, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
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
                      {dayjs(new Date(data?.sys?.sunrise * 1000)).format('HH:mm')}
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
                    <Text italic>{dayjs(new Date(data?.sys?.sunset * 1000)).format('HH:mm')}</Text>
                  </Flex>
                </Col>
              </Row>
            </Card>
          </Col>
        </>
      )}
      <Col xs={aprox ? 24 : 11}>
        <Card vertical style={{ position: 'relative', padding: 10, backgroundColor: token.colorBgBase, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
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
          <Title level={3} type='secondary' style={{ margin: 0 }}>Viento <Text type='secondary'>{aprox && '(aproximado)'}</Text></Title>
          <Flex style={{ zIndex: 2, justifyContent: 'space-between', marginTop: 10 }}>
            <Flex vertical align='center'>
              <IconWind color={token.colorPrimary} />
              <Text italic style={{ fontWeight: 500 }}>{data?.wind?.speed?.toFixed(2) ?? '---'} {units.wind}</Text>
            </Flex>
            <Flex vertical align='center'>
              <IconArrowBigLeftLine style={{ transform: `rotate(${data?.wind?.deg}deg)` }} color={token.colorPrimary} />
              <Text italic style={{ fontWeight: 500 }}>{data?.wind?.deg?.toFixed(2) ?? '---'} °</Text>
            </Flex>
            <Flex vertical align='center'>
              <IconWhirl color={token.colorPrimary} />
              <Text italic style={{ fontWeight: 500 }}>{data?.wind?.gust?.toFixed(2) ?? '---'} {units.wind}</Text>
            </Flex>
          </Flex>
        </Card>
      </Col>
    </Row>
  )
}

CardsInfo.propTypes = {
  data: PropTypes.object,
  aprox: PropTypes.bool
}

export default CardsInfo
