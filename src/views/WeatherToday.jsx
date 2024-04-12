import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'


// ant
import { Col, Flex, Row, theme } from 'antd'

// project imports
import AirPolution from './components/AirPolution'
import CardsInfo from './components/CardsInfo'
import MainWeatherToday from './components/MainWeatherToday'
import SecondWeatherToday from './components/SecondWeatherToday'

import weather from '../utils/data/weathers.json'
import { getIcon } from '../utils/iconWeather'

const { useToken } = theme

const WeatherToday = () => {
  const [todayData, position, loading] = useOutletContext()
  const { token } = useToken()

  const infoWeather = useMemo(() => {
    if (loading) return { desc: '', icons: [] }
    const clima = todayData?.weather[0]
    const desc = weather[clima?.id ?? 200]
    const infoIcons = getIcon(token, todayData?.weather[0]?.icon ?? '01d')

    return { desc, infoIcons }
  }, [todayData, loading, token])

  const contamination = useMemo(() => {
    if (loading) return []
    const info = todayData?.air?.list[0]?.components
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
  }, [todayData, loading])

  return (
    <Flex style={{ position: 'relative', justifyContent: 'end', width: '100%', paddingRight: 0, flexDirection: 'column', alignItems: 'end' }}>
      <Row style={{ maxWidth: '60%', width: '100%', marginTop: 50, padding: 0, paddingInline: '10%' }}>
        <Col
          xs={24} style={{
            position: 'relative',
            margin: 0,
            minHeight: 130,
            height: '100%'
          }}
        >
          <MainWeatherToday data={todayData?.main} title={position?.title} loading={loading} />
        </Col>
      </Row>

      <SecondWeatherToday data={todayData} infoWeather={infoWeather} />

      <Flex vertical style={{ width: '100%', alignItems: 'end', backgroundColor: token.colorPrimary, paddingTop: 50, marginTop: 60, paddingBottom: 50, boxShadow: '0.9px 2.2px 1.8px rgba(0, 0, 0, 0.009),2.2px 5.5px 4.4px rgba(0, 0, 0, 0.013),4.4px 11.2px 9px rgba(0, 0, 0, 0.017),9.1px 23px 18.6px rgba(0, 0, 0, 0.021),25px 63px 51px rgba(0, 0, 0, 0.03)' }}>

        <CardsInfo data={todayData} />

        <AirPolution data={contamination} />
      </Flex>
    </Flex>
  )
}
export default WeatherToday
