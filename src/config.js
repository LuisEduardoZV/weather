export const MAIN_PATH = '/weather'

export const BASE_URL_API = import.meta.env.VITE_BASE_URL_API
export const KEY_API = import.meta.env.VITE_KEY_API

export const KEY_TRANSLATE_API = import.meta.env.VITE_KEY_TRANSLATE_API
export const BASE_URL_TRANSLATE = import.meta.env.VITE_BASE_URL_TRANSLATE

export const KEY_GOOGLE_API = import.meta.env.VITE_KEY_GOOGLE_API

const config = {
  theme: 'light',
  locale: 'es',
  units: 'metric' // imperial para Fahrenheit
}

export default config
