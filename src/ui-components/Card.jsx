import PropTypes from 'prop-types'

import { Flex } from 'antd'

const Card = ({ children, style, ...props }) => {
  return (
    <Flex
      {...props} style={{
        minHeight: 100,
        justifyContent: 'space-between',
        width: '100%',
        margin: 0,
        padding: 0,
        zIndex: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
        boxShadow: '0.9px 2.2px 1.8px rgba(0, 0, 0, 0.009),2.2px 5.5px 4.4px rgba(0, 0, 0, 0.013),4.4px 11.2px 9px rgba(0, 0, 0, 0.017),9.1px 23px 18.6px rgba(0, 0, 0, 0.021),25px 63px 51px rgba(0, 0, 0, 0.03)',
        ...style
      }}
    >
      {children}
    </Flex>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default Card
