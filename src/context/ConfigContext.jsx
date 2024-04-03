import PropTypes from 'prop-types'
import { createContext } from 'react'

// project imports
import config from '../config'
import useLocalStorage from '../hooks/useLocalStorage'

const initialState = {
  ...config,
  onChangeTheme: () => {},
  onChangeLocale: () => {}
}

const ConfigContext = createContext(initialState)

function ConfigProvider ({ children }) {
  const [config, setConfig] = useLocalStorage('tan-graph-config', {
    theme: initialState.theme,
    locale: initialState.locale
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

  return (
    <ConfigContext.Provider
      value={{
        ...config, onChangeLocale, onChangeTheme
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

