/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { Col } from 'antd'

const HoverEffect = ({ className, children, aprox = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const items = useMemo(() => {
    if (!Array.isArray(children)) return [children]
    return children
  }, [children])

  return (
    <>
      {items.map((item, idx) => {
        return (
          <Col
            key={idx}
            xs={aprox ? 18 : 24}
            sm={aprox ? 20 : 8}
            lg={aprox ? 20 : 8}
            className={`main-hover-effect ${aprox ? 'mainColHoverEffect' : 'mainColHoverEffect'}`}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className={aprox ? 'motionSpan-card-aprox' : 'motionSpan-card'}
                  layoutId='hoverBackground'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 }
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 }
                  }}
                />
              )}
            </AnimatePresence>
            <Card aprox={aprox}>{item}</Card>
          </Col>
        )
      })}
    </>
  )
}

const Card = ({ style, children, aprox }) => {
  return (
    <div
      style={{
        borderRadius: '1rem',
        height: '100%',
        width: '100%',
        padding: aprox ? 0 : '1rem',
        overflow: 'hidden',
        borderWidth: '1px',
        borderColor: 'transparent',
        position: 'relative',
        zIndex: 20,
        ...style
      }}
    >
      <div style={{
        position: 'relative',
        zIndex: 50
      }}
      >
        <div style={{ padding: '1rem' }}>{children}</div>
      </div>
    </div>
  )
}

export { Card, HoverEffect }

