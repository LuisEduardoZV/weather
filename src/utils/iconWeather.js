import { IconCloudFilled, IconCloudRain, IconCloudStorm, IconMist, IconSnowflake, IconSun, IconSunLow } from '@tabler/icons-react'

export const iconsWeather = {
  '01d': [IconSun],
  '01n': [IconSun],
  '02d': [IconCloudFilled, IconSunLow],
  '02n': [IconCloudFilled, IconSunLow],
  '03d': [IconCloudFilled],
  '03n': [IconCloudFilled],
  '04d': [IconCloudFilled, IconCloudFilled],
  '04n': [IconCloudFilled, IconCloudFilled],
  '09d': [IconCloudRain],
  '09n': [IconCloudRain],
  '10d': [IconCloudRain, IconCloudFilled],
  '10n': [IconCloudRain, IconCloudFilled],
  '11d': [IconCloudStorm],
  '11n': [IconCloudStorm],
  '13d': [IconSnowflake],
  '13n': [IconSnowflake],
  '50d': [IconMist],
  '50n': [IconMist]
}
