import PropTypes from 'prop-types'


import { Tooltip } from 'react-tooltip'

// ant
import { IconArrowBigLeftLine, IconWhirl, IconWind } from '@tabler/icons-react'
import { Col, Flex, Typography, theme } from 'antd'

// project
import useConfig from '../../hooks/useConfig'
import Card from '../../ui-components/Card'

const { Title, Text } = Typography
const { useToken } = theme

const WindCard = ({ aprox = false, data }) => {
  const { token } = useToken()
  const { units } = useConfig()

  return (
    <Col xs={aprox ? 24 : 24} lg={aprox ? 12 : 11}>
      <Card vertical style={{ position: 'relative', padding: 10, backgroundColor: token.colorBgBase, boxShadow: '3.4px 3.4px 2.9px rgba(0, 0, 0, 0.002),8.7px 8.7px 7.3px rgba(0, 0, 0, 0.009),17.7px 17.7px 14.9px rgba(0, 0, 0, 0.062),36.5px 36.5px 30.7px rgba(0, 0, 0, 0.069),100px 100px 84px rgba(0, 0, 0, 0.07)' }}>
        <div id='Clouds'>
          <div className='Cloud Foreground' />
          <div className='Cloud Background' />
          <div className='Cloud Foreground' />
          <div className='Cloud Background' />
          <div className='Cloud Foreground' />
          <div className='Cloud Background' />
          <div className='Cloud Background' />
          <div className='Cloud Foreground' />
          <div className='Cloud Background' />
          <div className='Cloud Background' />
        </div>
        <Title level={3} type='secondary' style={{ margin: 0 }}>Viento <Text type='secondary'>{aprox && '(aproximado)'}</Text></Title>
        <Flex style={{ zIndex: 2, justifyContent: 'space-between', marginTop: 10 }}>
          <div className='container-tooltip'>
            <a
              data-tooltip-id='tootltip-vel'
              data-tooltip-content='Velocidad'
              data-tooltip-place='right'
            >
              <Flex vertical align='center'>
                <IconWind color={token.colorPrimary} />
                <Text italic style={{ fontWeight: 500 }}>
                  {data?.wind?.speed?.toFixed(2) ?? '---'} {units.wind}
                </Text>
              </Flex>
            </a>
            <Tooltip id='tootltip-vel' className='tooltip' />
          </div>
          <div className='container-tooltip'>
            <a
              data-tooltip-id='tootltip-deg'
              data-tooltip-content='Dirección'
              data-tooltip-place='left'
            >
              <Flex vertical align='center'>
                <IconArrowBigLeftLine style={{ transform: `rotate(${data?.wind?.deg}deg)` }} color={token.colorPrimary} />
                <Text italic style={{ fontWeight: 500 }}>{data?.wind?.deg?.toFixed(2) ?? '---'} °</Text>
              </Flex>
            </a>
            <Tooltip id='tootltip-deg' className='tooltip' />
          </div>
          <div className='container-tooltip'>
            <a
              data-tooltip-id='tootltip-gust'
              data-tooltip-content='Ráfagas'
              data-tooltip-place='left'
            >
              <Flex vertical align='center'>
                <IconWhirl color={token.colorPrimary} />
                <Text italic style={{ fontWeight: 500 }}>{data?.wind?.gust?.toFixed(2) ?? '---'} {units.wind}</Text>
              </Flex>
            </a>
            <Tooltip id='tootltip-gust' className='tooltip' />
          </div>
        </Flex>
      </Card>
    </Col>
  )
}

WindCard.propTypes = {
  aprox: PropTypes.bool,
  data: PropTypes.object
}

export default WindCard
