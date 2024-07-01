/* eslint-disable camelcase */
import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'

// third imports
import dayjs from 'dayjs'

// ant imports
import { Flex, Row } from 'antd'

// project  imports
import { useGetWeather } from '../hooks/useGetWeather'
import { useSearch } from '../hooks/useSearch'
import { WorldGlobe } from '../ui-components/WorldGlobe'
import MainLayout from './MainLayout'
import FilterWeather from './components/FilterWeather'

const Main = () => {
  const { position, setSearch } = useSearch()
  const { loading, todayData, dataViews } = useGetWeather(position)

  const [view, setView] = useState(dayjs(new Date()).format('YYYY-MM-DD'))

  const infoWorld = useMemo(() => {
    return {
      position: todayData?.coord,
      country: todayData?.sys?.country
    }
  }, [todayData?.coord, todayData?.sys?.country])

  return (
    <MainLayout setSearch={setSearch}>
      <Flex className='containerGlobe'>
        {!loading && <WorldGlobe position={infoWorld.position} country={infoWorld.country} />}
      </Flex>
      <Row justify='end' style={{ backgroundColor: 'transparent' }}>
        <Flex
          vertical style={{
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            position: 'relative',
            justifyContent: 'end',
            alignItems: 'end',
            backgroundColor: 'transparent'
          }}
        >
          <FilterWeather view={view} setView={setView} />
          <Outlet context={[todayData, position, loading, dataViews, view]} />
        </Flex>
      </Row>
    </MainLayout>
  )
}

export default Main
