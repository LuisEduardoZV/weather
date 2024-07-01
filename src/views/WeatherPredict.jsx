import { useOutletContext } from 'react-router-dom'

// third
import dayjs from 'dayjs'

// ant
import { Col, Flex, Row, Typography, theme } from 'antd'

// project
import { usePredictInfo } from '../hooks/usePredictInfo'
import { HoverEffect } from '../ui-components/extended/CardHoverEffect'
import AirPolution from './components/AirPolution'
import MainWeatherToday from './components/MainWeatherToday'
import WeatherPeerHour from './components/WeatherPeerHour'
import WindCard from './components/WindCard'

const { Title } = Typography
const { useToken } = theme
dayjs.locale('es')

const WeatherPredict = () => {
  const [, position, loading, nextData, view] = useOutletContext()
  const { token } = useToken()

  const { airMedInfo, mainData, promedioInfo } = usePredictInfo(nextData, view)

  return (
    <Flex style={{ position: 'relative', justifyContent: 'end', width: '100%', paddingRight: 0, flexDirection: 'column', alignItems: 'end' }}>
      <MainWeatherToday data={promedioInfo.main} title={position?.title} loading={loading} aprox />

      <Row className='rowWindAprox'>
        <WindCard data={promedioInfo} aprox />
      </Row>

      <Flex vertical className='secondContainerPredict' style={{ backgroundColor: token.colorPrimary }}>

        <Row style={{ width: '100%', paddingTop: 10 }} justify='center'>
          <Col xs={24}>
            <Flex style={{ width: '100%', gap: 10 }} className='peerHourTitle'>
              <Title level={1} style={{ color: token.colorTextLightSolid }}>Clima por hora: </Title>
              <Title level={4} style={{ color: token.colorPrimaryBorder }} className='datePredict'>{dayjs(view).format('dddd DD - MM - YYYY')}</Title>
            </Flex>
          </Col>
          <HoverEffect aprox>
            {mainData.map((op, ind) => (
              <WeatherPeerHour key={ind} data={op} />
            ))}
          </HoverEffect>
        </Row>

        <AirPolution data={airMedInfo} />

      </Flex>
    </Flex>
  )
}

export default WeatherPredict
