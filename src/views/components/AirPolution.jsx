import PropTypes from 'prop-types'

// ant
import { Col, Flex, Row, Typography, theme } from 'antd'

const { Title, Text } = Typography
const { useToken } = theme

const AirPolution = ({ data }) => {
  const { token } = useToken()
  return (
    <Row className='airRow' justify='center'>
      <Col xs={24}>
        <Flex style={{ width: '100%' }}>
          <Title level={3} style={{ marginTop: 10, color: token.colorTextLightSolid }}>Contaminación atmosférica</Title>
        </Flex>
      </Col>
      <Col xs={24} lg={18} style={{ marginTop: 50 }}>
        <Row style={{ width: '100%', justifyContent: 'space-between', rowGap: 40 }}>
          {data.map((op, index) => (
            <Col key={index} xs={10} sm={7}>
              <Flex
                vertical align='center' justify='center'
                className='cardAir'
              >
                <Flex align='end' className='cardAirTitle'>
                  <Title level={3} style={{ margin: 0 }}>{op.title}</Title>
                  <Text style={{ fontSize: 12 }}>{op.elevation}</Text>
                </Flex>
                <Text>{op.value?.toFixed(2)} {op.sufix} </Text>
              </Flex>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

AirPolution.propTypes = {
  data: PropTypes.array
}

export default AirPolution
