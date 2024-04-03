import { useRoutes } from 'react-router-dom'

// project imports
import MainLayout from '../layout'

export default function ThemeRoutes () {
  const Routes = {
    path: '/',
    element: (
      <MainLayout />
    ),
    children: [{
      path: '/',
      element: <>1</>
    },
    {
      path: '/hoy',
      element: <>2</>
    }]
  }
  return useRoutes([Routes])
}
