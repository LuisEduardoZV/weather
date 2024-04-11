import PropTypes from 'prop-types'

// ant
import { Flex, Typography, theme } from 'antd'

// project
import useConfig from '../../hooks/useConfig'
import Card from '../../ui-components/Card'

const { Title, Text } = Typography
const { useToken } = theme

const MainWeatherToday = ({ data, title, loading, aprox }) => {
  const { token } = useToken()
  const { units } = useConfig()

  return (
    <>
      <Card
        vertical style={{
          minHeight: 140,
          height: '100%',
          justifyContent: 'space-between',
          position: 'relative',
          width: '100%',
          margin: 0,
          padding: 10,
          zIndex: 10,
          backgroundColor: 'transparent',
          gap: 15,
          borderRadius: 8,
          boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)'
        }}
      >
        <Title
          level={4} style={{
            margin: 0
          }}
        >{title}
        </Title>
        {!loading && (
          <Flex style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
            <Flex vertical style={{ width: '100%', height: '100%' }}>
              <Text style={{ color: token.colorPrimaryText, fontWeight: 700 }}>Temperatura: <Text italic style={{ fontWeight: 400 }}>{data.temp?.toFixed(2)} °{units.temp}</Text></Text>
              <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Temperatura Máxima: <Text italic style={{ fontWeight: 400 }}>{data.temp_max?.toFixed(2)} °{units.temp}</Text></Text>
              <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Temperatura Mínima: <Text italic style={{ fontWeight: 400 }}>{data.temp_min?.toFixed(2)} °{units.temp}</Text></Text>
            </Flex>
            <Flex vertical style={{ width: '100%', height: '100%', justifyContent: aprox && 'space-between' }}>
              <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Sensación Térmica: <Text italic style={{ fontWeight: 400 }}>{data.feels_like?.toFixed(2)} °{units.temp}</Text></Text>
              {data.humidity && <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Humedad: <Text italic style={{ fontWeight: 400 }}>{data.humidity?.toFixed(2)} %</Text></Text>}
              {aprox && <Text type='secondary' italic>*Toda la información ha sido aproximada manualmente*</Text>}
            </Flex>
          </Flex>
        )}
      </Card>
    </>
  )
}

MainWeatherToday.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  loading: PropTypes.bool,
  aprox: PropTypes.bool
}

export default MainWeatherToday
