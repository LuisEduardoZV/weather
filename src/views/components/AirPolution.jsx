import PropTypes from 'prop-types'

// ant
import { Col, Flex, Row, Typography, theme } from 'antd'

const { Title, Text } = Typography
const { useToken } = theme

const AirPolution = ({ data }) => {
  const { token } = useToken()
  return (
    <Row style={{ width: '100%', paddingInline: 50, paddingTop: 50 }} justify='center'>
      <Col xs={24}>
        <Flex style={{ width: '100%' }}>
          <Title style={{ marginTop: 10, color: token.colorTextLightSolid }}>Contaminación atmosférica</Title>
        </Flex>
      </Col>
      <Col xs={12} style={{ marginTop: 50 }}>
        <Row style={{ width: '100%', justifyContent: 'space-between', rowGap: 20 }}>
          {data.map((op, index) => (
            <Col key={index} xs={7}>
              <Flex
                vertical align='center' justify='center'
                className='cardAir'
              >
                <Title level={3} style={{ margin: 0 }}>{op.title}</Title>
                <Text>{op.value} {op.sufix}</Text>
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
