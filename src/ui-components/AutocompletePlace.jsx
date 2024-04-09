/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import usePlacesAutocomplete from 'use-places-autocomplete'

// ant
import { AutoComplete, Flex, Typography, theme } from 'antd'

const { Text } = Typography
const { useToken } = theme

const AutocompletePlaces = ({ setSearch }) => {
  const {
    ready,
    value,
    suggestions: { data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete()
  const { token } = useToken()
  const finalOptions = useMemo(() => (data ?? []), [data])

  return (
    <AutoComplete
      value={value}
      disabled={!ready}
      options={finalOptions}
      style={{
        width: '60%'
      }}
      onSearch={(val) => {
        setValue(val)
      }}
      optionRender={(op) => {
        const { data } = op
        const { structured_formatting: { main_text, secondary_text } } = data

        return (
          <Flex
            vertical style={{ width: '100%', gap: 0 }} onClick={() => {
              setValue(`${main_text}`)
              setSearch(data)
              clearSuggestions()
            }}
          >
            <Text strong style={{ color: token.colorPrimaryText }}>{main_text}</Text>
            <Text type='secondary' italic>{secondary_text}</Text>
          </Flex>
        )
      }}
      placeholder='Buscar lugar'
    />
  )
}

AutocompletePlaces.propTypes = {
  setSearch: PropTypes.func
}

export default AutocompletePlaces
