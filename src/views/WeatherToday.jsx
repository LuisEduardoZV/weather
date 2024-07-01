import { useOutletContext } from 'react-router-dom'


// ant
import { Flex, theme } from 'antd'

// project imports
import { useTodayInfo } from '../hooks/useTodayInfo'
import AirPolution from './components/AirPolution'
import CardsInfo from './components/CardsInfo'
import MainWeatherToday from './components/MainWeatherToday'
import SecondWeatherToday from './components/SecondWeatherToday'

const { useToken } = theme

const WeatherToday = () => {
  const [todayData, position, loading] = useOutletContext()
  const { token } = useToken()

  const { contamination, infoWeather } = useTodayInfo(loading, todayData)


  return (
    <Flex style={{ position: 'relative', justifyContent: 'end', width: '100%', paddingRight: 0, flexDirection: 'column', alignItems: 'end' }}>

      <MainWeatherToday data={todayData?.main} title={position?.title} loading={loading} />

      <SecondWeatherToday data={todayData} infoWeather={infoWeather} />

      <Flex vertical style={{ width: '100%', alignItems: 'end', backgroundColor: token.colorPrimary, paddingTop: 50, marginTop: 60, paddingBottom: 50, boxShadow: '0.9px 2.2px 1.8px rgba(0, 0, 0, 0.009),2.2px 5.5px 4.4px rgba(0, 0, 0, 0.013),4.4px 11.2px 9px rgba(0, 0, 0, 0.017),9.1px 23px 18.6px rgba(0, 0, 0, 0.021),25px 63px 51px rgba(0, 0, 0, 0.03)' }}>

        <CardsInfo data={todayData} />

        <AirPolution data={contamination} />
      </Flex>
    </Flex>
  )
}
export default WeatherToday
