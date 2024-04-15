import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

// third imports
import dayjs from 'dayjs'

// ant
import { Flex, Menu } from 'antd'

const FilterWeather = ({ view, setView }) => {
  const onClick = (e) => {
    setView(e.key)
  }

  const items = useMemo(() => {
    const newItems = []
    let date = dayjs(new Date())

    for (let i = 0; i < 5; i++) {
      newItems.push({
        label: (
          <Link to={i === 0 ? '/' : 'predict'}>
            {i === 0
              ? 'Hoy'
              : i === 1 ? 'Mañana' : date.format('DD/MM')}
          </Link>
        ),
        key: date.format('YYYY-MM-DD')
      })
      date = date.add(1, 'day')
    }

    return newItems
  }, [])

  return (
    <Flex className='filterWeather'>
      <Menu onClick={onClick} selectedKeys={[view]} mode='horizontal' items={items} style={{ flex: 'auto', backgroundColor: 'transparent', width: 'fit-content' }} />
    </Flex>
  )
}

FilterWeather.propTypes = {
  view: PropTypes.string,
  setView: PropTypes.func
}

export default FilterWeather
