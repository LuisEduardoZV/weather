/* eslint-disable camelcase */
import { useEffect, useState } from 'react'

import { KEY_GOOGLE_API } from '../config'
import { apiCall } from '../utils/apiFunctions'

export function useSearch (pos) {
  const [search, setSearch] = useState(null)
  const [position, setPosition] = useState(pos ?? {
    cords: {
      lng: -99.1461,
      lat: 19.3823
    },
    title: 'Ciudad de México, México'
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const dataGoogle = await apiCall({ url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&result_type=postal_code&key=' + KEY_GOOGLE_API })
        if (dataGoogle?.status === 'OK') {
          if (dataGoogle?.results.length > 0) {
            const title = `${dataGoogle.results[0].address_components[2].long_name}, ${dataGoogle.results[0].address_components[3].long_name}, ${dataGoogle.results[0].address_components[4].long_name}`
            setPosition({ cords: { lat: position.coords.latitude, lng: position.coords.longitude }, title })
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (search && search.place_id) {
        const dataGoogle = await apiCall({ url: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + search.place_id + '&key=' + KEY_GOOGLE_API })

        if (dataGoogle?.status === 'OK') {
          if (dataGoogle?.results.length > 0) {
            const { structured_formatting: { main_text } } = search
            const title = main_text

            setPosition({ cords: dataGoogle.results[0].geometry.location, title })
          }
        }
      }
    })()
  }, [search])

  return { setSearch, position }
}
