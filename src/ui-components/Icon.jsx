

import PropTypes from 'prop-types'

import { theme } from 'antd'

const { useToken } = theme

const Icon = ({ option, style, idx, length }) => {
  const { token } = useToken()

  const WeatherIcon = option
  return (
    <WeatherIcon
      size={50}
      color={(idx === 0 && length === 2) ? token.grey400 : style.color}
      {...((idx === 1)
        ? {
            style: {
              position: 'absolute',
              color: token.grey300,
              ...style,
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
}

Icon.propTypes = {
  option: PropTypes.any,
  style: PropTypes.object,
  idx: PropTypes.number,
  length: PropTypes.number
}

export default Icon
