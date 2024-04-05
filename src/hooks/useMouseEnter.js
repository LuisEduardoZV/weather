import { useContext } from 'react'

const useMouseEnter = (mouseContext) => {
  const context = useContext(mouseContext)
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a MouseEnterProvider')
  }
  return context
}

export default useMouseEnter
