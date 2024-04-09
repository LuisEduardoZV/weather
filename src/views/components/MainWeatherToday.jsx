import PropTypes from 'prop-types'

// ant
import { Space, Typography, theme } from 'antd'

// project
import useConfig from '../../hooks/useConfig'
import Card from '../../ui-components/Card'

const { Title, Text } = Typography
const { useToken } = theme

const MainWeatherToday = ({ data, title }) => {
  const { token } = useToken()
  const { units } = useConfig()

  return (
    <>
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
      <Card
        vertical style={{
          minHeight: 130,
          justifyContent: 'space-between',
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
        <Title level={4} style={{ margin: 0 }}>{title}</Title>
        <Space direction='horizontal' style={{ width: '100%', display: 'flex', gap: '15%', alignItems: 'start' }}>
          <Space direction='vertical' style={{ width: '100%', height: '100%' }}>
            <Text style={{ color: token.colorPrimaryText, fontWeight: 700 }}>Temperatura: <Text italic style={{ fontWeight: 400 }}>{data.temp} °{units.temp}</Text></Text>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Temperatura Máxima: <Text italic style={{ fontWeight: 400 }}>{data.temp_max} °{units.temp}</Text></Text>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Temperatura Mínima: <Text italic style={{ fontWeight: 400 }}>{data.temp_min} °{units.temp}</Text></Text>
          </Space>
          <Space direction='vertical' style={{ width: '100%', height: '100%' }}>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Sensación térmica: <Text italic style={{ fontWeight: 400 }}>{data.feels_like} °{units.temp}</Text></Text>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Humedad: <Text italic style={{ fontWeight: 400 }}>{data.humidity} °{units.temp}</Text></Text>
          </Space>
        </Space>
      </Card>
    </>
  )
}

MainWeatherToday.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string
}

export default MainWeatherToday
