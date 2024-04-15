import PropTypes from 'prop-types'

// third
import dayjs from 'dayjs'

// ant
import { IconSunrise, IconSunset } from '@tabler/icons-react'
import { Col, Flex, Row, Typography, theme } from 'antd'

// project
import useConfig from '../../hooks/useConfig'
import Card from '../../ui-components/Card'
import WindCard from './WindCard'

const { Title, Text } = Typography
const { useToken } = theme

const CardsInfo = ({ data, aprox = false }) => {
  const { token } = useToken()
  const { units } = useConfig()

  return (
    <Row className='rowCardsInfo'>
      {!aprox && (
        <>
          <Col xs={24} sm={10} lg={5}>
            <Card vertical style={{ position: 'relative', padding: 10, backgroundColor: token.colorPrimary, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
              <div className='circle'>
                <div className='wave' style={{ backgroundColor: token.colorBgBase }} />
              </div>
              <Flex vertical align='center' style={{ zIndex: 2, height: '100%', margin: 0, gap: 15 }}>
                <Title level={5} type='secondary' style={{ margin: 0 }}>Presión a Nivel del Mar</Title>
                <Text strong italic>{data?.main?.sea_level ?? '---'} {units.press}</Text>
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={10} lg={6} style={{ position: 'relative' }}>
            <Card vertical style={{ position: 'relative', justifyContent: 'center', paddingTop: 10, paddingBottom: 10, backgroundColor: token.colorBgBase, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
              <Row style={{ position: 'relative' }}>
                <Col xs={12} className='col-sun-positions'>
                  <Flex
                    vertical align='center' justify='space-between' gap={10}
                  >
                    <IconSunrise
                      style={{
                        width: 45,
                        color: token.colorWarningActive,
                        transition: 'transform 0.3s ease-in-out, margin 0.3s ease-in-out'
                      }}
                      className='iconsunset'
                    />
                    <Text strong className='transition-visible col-sun-positions-type'>Amanecer</Text>
                    <Text italic>
                      {dayjs(new Date(data?.sys?.sunrise * 1000)).format('HH:mm')}
                    </Text>
                  </Flex>
                </Col>
                <Flex style={{ height: '100%', borderLeft: 1, borderLeftStyle: 'solid', borderColor: token.colorPrimary, position: 'absolute', zIndex: 9999, top: 0, left: '50%', display: 'flex' }} />
                <Col xs={12} className='col-sun-positions'>
                  <Flex
                    vertical align='center' justify='space-between' gap={10}
                  >
                    <IconSunset
                      style={{
                        width: 45,
                        color: token.colorWarningActive,
                        transition: 'transform 0.3s ease-in-out, margin 0.3s ease-in-out'
                      }}
                      className='iconsunset'
                    />
                    <Text strong className='transition-visible col-sun-positions-type'>Atardecer</Text>
                    <Text italic>{dayjs(new Date(data?.sys?.sunset * 1000)).format('HH:mm')}</Text>
                  </Flex>
                </Col>
              </Row>
            </Card>
          </Col>
        </>
      )}
      <WindCard data={data} aprox={aprox} />
    </Row>
  )
}

CardsInfo.propTypes = {
  data: PropTypes.object,
  aprox: PropTypes.bool
}

export default CardsInfo
