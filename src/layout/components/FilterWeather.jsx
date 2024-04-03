import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

// third imports
import dayjs from 'dayjs'

// ant
import { Flex, Menu } from 'antd'

const defaultItems = [
  {
    label: (
      <Link to=''>
        Hoy
      </Link>
    ),
    key: 'today'
  },
  {
    label: (
      <Link to=''>
        Mañana
      </Link>
    ),
    key: 'tomorrow'
  }
]

const FilterWeather = ({ view, setView }) => {
  const onClick = (e) => {
    setView(e.key)
  }

  const items = useMemo(() => {
    const newItems = [...defaultItems]
    let date = dayjs(new Date()).add(2, 'day')

    for (let i = 0; i < 3; i++) {
      newItems.push({
        label: (
          <Link to=''>
            {date.format('DD/MM')}
          </Link>
        ),
        key: `day${i + 2}`
      })
      date = date.add(1, 'day')
    }

    return newItems
  }, [])

  return (
    <Flex style={{ justifyContent: 'flex-end', padding: 0, margin: 0 }}>
      <Menu onClick={onClick} selectedKeys={[view]} mode='horizontal' items={items} style={{ maxWidth: '30%', flex: 'auto' }} />
    </Flex>
  )
}

FilterWeather.propTypes = {
  view: PropTypes.string,
  setView: PropTypes.func
}

export default FilterWeather
