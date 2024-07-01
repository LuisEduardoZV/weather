import PropTypes from 'prop-types'

// ant
import { IconCloudFog, IconGauge } from '@tabler/icons-react'
import { Flex, Row, theme, Typography } from 'antd'

// project
import useConfig from '../../hooks/useConfig'
import { HoverEffect } from '../../ui-components/extended/CardHoverEffect'
import Icon from '../../ui-components/Icon'

const { Text, Title } = Typography
const { useToken } = theme

const SecondWeatherToday = ({ data, infoWeather }) => {
  const { token } = useToken()
  const { units } = useConfig()

  return (
    <Row className='iconCardInfo'>
      <HoverEffect>
        <Flex style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          position: 'relative'
        }}
        >
          <IconGauge
            color={token.colorPrimary}
            size={70}
            style={{
              opacity: 1,
              zIndex: 10,
              filter: `drop-shadow(4.5px 4.5px 4.9px ${token.colorPrimary})`
            }}
          />
          <Text type='secondary' style={{ margin: 0, padding: 0, marginTop: 10 }}>Presión</Text>
          <Title level={5} style={{ margin: 0, padding: 0, position: 'relative' }}>
            {data?.main?.pressure} {units.press}
          </Title>
        </Flex>
        <Flex style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          position: 'relative'
        }}
        >
          {Array.isArray(infoWeather?.infoIcons?.icons) && infoWeather.infoIcons.icons.map((op, key) => (
            <Icon
              key={key}
              idx={key}
              style={infoWeather?.infoIcons?.style}
              length={infoWeather?.infoIcons?.icons?.length}
              option={op}
            />
          ))}
          <Text type='secondary' style={{ margin: 0, padding: 0, marginTop: 10 }}>Condiciones</Text>
          <Title level={5} style={{ margin: 0, padding: 0 }}>{infoWeather.desc}</Title>
        </Flex>
        <Flex style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          position: 'relative'
        }}
        >
          <IconCloudFog
            color={token.colorPrimaryActive}
            size={70}
            style={{
              opacity: 1,
              zIndex: 10,
              filter: `drop-shadow(4.5px 4.5px 4.9px ${token.colorPrimaryActive})`
            }}
          />
          <Text type='secondary' style={{ margin: 0, padding: 0, marginTop: 10 }}># Nubes</Text>
          <Title level={5} style={{ margin: 0, padding: 0 }}>{data?.clouds?.all}</Title>
        </Flex>
      </HoverEffect>
    </Row>
  )
}

SecondWeatherToday.propTypes = {
  data: PropTypes.object,
  infoWeather: PropTypes.object
}

export default SecondWeatherToday
