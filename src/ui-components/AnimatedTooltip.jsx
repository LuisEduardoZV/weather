/* eslint-disable react/prop-types */
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'

const AnimatedTooltip = ({ item, children }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0) // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  )
  const handleMouseMove = event => {
    const halfWidth = event.target.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
  }

  return (
    <>
      <div
        key={item.desc}
        onMouseEnter={() => setHoveredIndex(item.id)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {hoveredIndex === item.id && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 10
              }
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX,
              rotate,
              whiteSpace: 'nowrap'
            }}
            className='motionTooltip'
          >
            <div className='class1' />
            <div className='class2' />
            <div className='class3'>
              {item.desc}
            </div>
          </motion.div>
        )}

        <div onMouseMove={handleMouseMove}>
          {children}
        </div>
      </div>
    </>
  )
}

export default AnimatedTooltip
