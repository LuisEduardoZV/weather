export const MAIN_PATH = 'weather'
export const NAME_APP = 'WeatherApp'

export const BASE_URL_API = 'http://api.openweathermap.org/data/2.5/'
export const KEY_API = import.meta.env.VITE_KEY_API

export const KEY_GOOGLE_API = import.meta.env.VITE_KEY_GOOGLE_API

const config = {
  theme: 'light',
  locale: 'es',
  units: {
    type: 'metric', // imperial para Fahrenheit
    temp: 'C',
    press: 'hPa',
    wind: 'm/s'
  }
}

export default config
