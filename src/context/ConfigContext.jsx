import PropTypes from 'prop-types'
import { createContext } from 'react'

// project imports
import config from '../config'
import useLocalStorage from '../hooks/useLocalStorage'

const initialState = {
  ...config,
  onChangeTheme: () => {},
  onChangeLocale: () => {},
  onChangeUnits: () => {}
}

const ConfigContext = createContext(initialState)

function ConfigProvider ({ children }) {
  const [config, setConfig] = useLocalStorage('weather-config', {
    theme: initialState.theme,
    locale: initialState.locale,
    units: initialState.units
  })

  const onChangeTheme = (theme) => {
    setConfig({
      ...config,
      theme
    })
  }

  const onChangeLocale = (locale) => {
    setConfig({
      ...config,
      locale
    })
  }

  const onChangeUnits = (units) => {
    setConfig({
      ...config,
      units
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        ...config, onChangeLocale, onChangeTheme, onChangeUnits
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.node
}

export { ConfigContext, ConfigProvider }

