import { IconCloudFilled, IconCloudRain, IconCloudStorm, IconMist, IconSnowflake, IconSun } from '@tabler/icons-react'

const iconsWeather = {
  '01d': {
    icons: [IconSun],
    style: {}
  },
  '01n': {
    icons: [IconSun],
    style: {}
  },
  '02d': {
    icons: [IconCloudFilled, IconSun],
    style: {
      right: '35%',
      top: '-8%',
      transform: 'translateX(50%)'
    }
  },
  '02n': {
    icons: [IconCloudFilled, IconSun],
    style: {
      right: '35%',
      top: '-8%',
      transform: 'translateX(50%)'
    }
  },
  '03d': {
    icons: [IconCloudFilled],
    style: {}
  },
  '03n': {
    icons: [IconCloudFilled],
    style: {}
  },
  '04d': {
    icons: [IconCloudFilled, IconCloudFilled],
    style: {
      right: '40%',
      top: 0,
      transform: 'translateX(50%)'
    }
  },
  '04n': {
    icons: [IconCloudFilled, IconCloudFilled],
    style: {
      right: '40%',
      top: 0,
      transform: 'translateX(50%)'
    }
  },
  '09d': {
    icons: [IconCloudRain],
    style: {}
  },
  '09n': {
    icons: [IconCloudRain],
    style: {}
  },
  '10d': {
    icons: [IconCloudFilled, IconCloudRain],
    style: {
      right: '47%',
      top: '3%',
      transform: 'translateX(50%)'
    }
  },
  '10n': {
    icons: [IconCloudRain, IconCloudFilled],
    style: {
      right: '47%',
      top: '3%',
      transform: 'translateX(50%)'
    }
  },
  '11d': {
    icons: [IconCloudStorm],
    style: {}
  },
  '11n': {
    icons: [IconCloudStorm],
    style: {}
  },
  '13d': {
    icons: [IconSnowflake],
    style: {}
  },
  '13n': {
    icons: [IconSnowflake],
    style: {}
  },
  '50d': {
    icons: [IconMist],
    style: {}
  },
  '50n': {
    icons: [IconMist],
    style: {}
  }
}

export const getIcon = (theme, key) => {
  const icon = iconsWeather[key]
  switch (key) {
    case '01d':
    case '01n':
      icon.style.color = theme.colorWarning
      break
    case '02d':
    case '02n':
      icon.style.color = theme.colorWarning
      break
    case '03d':
    case '03n':
      icon.style.color = theme.grey400
      break
    case '04d':
    case '04n':
      icon.style.color = theme.grey500
      break
    case '09d':
    case '09n':
      icon.style.color = theme.colorInfo
      break
    case '10d':
    case '10n':
      icon.style.color = theme.grey600
      break
    case '11d':
    case '11n':
      icon.style.color = theme.colorWarning
      break
    case '13d':
    case '13n':
      icon.style.color = theme.colorInfoBorder
      break
    case '50d':
    case '50n':
      icon.style.color = theme.grey500
      break
    default:
      icon.style.color = theme.colorWarning
      break
  }

  return icon
}
