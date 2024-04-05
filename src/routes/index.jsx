import { useRoutes } from 'react-router-dom'

// project imports
import MainLayout from '../layout'
import WeatherToday from '../views/WeatherToday'

export default function ThemeRoutes () {
  const Routes = {
    path: '/',
    element: (
      <MainLayout />
    ),
    children: [{
      path: '',
      element: <WeatherToday />
    },
    {
      path: 'today',
      element: <WeatherToday />
    },
    {
      path: 'predict',
      element: <>2</>
    }]
  }
  return useRoutes([Routes])
}
