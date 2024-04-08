import PropTypes from 'prop-types'
import { useMemo } from 'react'

// ant
import { Flex, Space, Typography, theme } from 'antd'

// project
import useConfig from '../../hooks/useConfig'

const { Title, Text } = Typography
const { useToken } = theme

const MainWeatherToday = ({ data, title }) => {
  const { token } = useToken()
  const { units } = useConfig()

  const unidades = useMemo(() => {
    switch (units) {
      case 'metric':
        return '° C'
      default:
        return '° F'
    }
  }, [units])

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
      <Flex
        vertical style={{
          minHeight: 130,
          justifyContent: 'space-between',
          width: '100%',
          margin: 0,
          padding: 10,
          zIndex: 10,
          backgroundColor: 'transparent',
          gap: 15
        }}
      >
        <Title level={4} style={{ margin: 0 }}>{title}</Title>
        <Space direction='horizontal' style={{ width: '100%', display: 'flex', gap: '15%', alignItems: 'start' }}>
          <Space direction='vertical' style={{ width: '100%', height: '100%' }}>
            <Text style={{ color: token.colorPrimaryText, fontWeight: 700 }}>Temperatura: <Text italic style={{ fontWeight: 400 }}>{data.temp} {unidades}</Text></Text>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Temperatura Máxima: <Text italic style={{ fontWeight: 400 }}>{data.temp_max} {unidades}</Text></Text>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Temperatura Mínima: <Text italic style={{ fontWeight: 400 }}>{data.temp_min} {unidades}</Text></Text>
          </Space>
          <Space direction='vertical' style={{ width: '100%', height: '100%' }}>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Sensación térmica: <Text italic style={{ fontWeight: 400 }}>{data.feels_like} {unidades}</Text></Text>
            <Text style={{ color: token.colorPrimary, fontWeight: 700 }}>Humedad: <Text italic style={{ fontWeight: 400 }}>{data.humidity} {unidades}</Text></Text>
          </Space>
        </Space>
      </Flex>
    </>
  )
}

MainWeatherToday.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string
}

export default MainWeatherToday
