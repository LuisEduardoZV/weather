/* eslint-disable react-hooks/exhaustive-deps */
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export default function WebGLRenderer () {
  const { gl, size } = useThree()

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio)
    gl.setSize(size.width, size.height)
    gl.setClearColor(0xffaaff, 0)
  }, [])

  return null
}
