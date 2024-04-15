import PropTypes from 'prop-types'

// ant
import { IconCloudFog, IconGauge } from '@tabler/icons-react'
import { Flex, Row, Typography, theme } from 'antd'

// project
import useConfig from '../../hooks/useConfig'
import { HoverEffect } from '../../ui-components/extended/CardHoverEffect'

const { Text, Title } = Typography
const { useToken } = theme

const SecondWeatherToday = ({ data, infoWeather }) => {
  const { token } = useToken()
  const { units } = useConfig()

  return (
    <Row style={{ maxWidth: '60%', width: '100%', paddingInline: '10%', marginTop: 60 }}>
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
            style={
          {
            opacity: 1,
            zIndex: 10,
            filter: `drop-shadow(4.5px 4.5px 4.9px ${token.colorPrimary})`
          }
        }
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
          {
                Array.isArray(infoWeather?.infoIcons?.icons) && infoWeather.infoIcons.icons.map((i, key) => {
                  const Icon = i
                  const style = infoWeather?.infoIcons?.style
                  return (
                    <Icon
                      key={key}
                      size={70}
                      color={(key === 0 && infoWeather?.infoIcons?.icons?.length === 2) ? token.grey400 : style.color}
                      {...((key === 1)
                        ? {
                            style: {
                              position: 'absolute',
                              color: token.grey300,
                              ...infoWeather?.infoIcons?.style,
                              filter: `drop-shadow(4.5px 4.5px 4.9px ${token.grey400})`,
                              opacity: 1,
                              zIndex: 2
                            }
                          }
                        : {
                            style: {
                              zIndex: 3,
                              filter: `drop-shadow(4.5px 4.5px 4.9px ${token.grey400})`
                            }
                          })}
                    />
                  )
                })
              }
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
            style={
                  {
                    opacity: 1,
                    zIndex: 10,
                    filter: `drop-shadow(4.5px 4.5px 4.9px ${token.colorPrimaryActive})`
                  }
                }
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
