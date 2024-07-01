/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import { Fog, PerspectiveCamera, Scene, Vector3 } from 'three'
import ThreeGlobe from 'three-globe'

import Globe from './Globe'
import WebGLRenderer from './WebGLRenderer'

extend({ ThreeGlobe })

const aspect = 1
const cameraZ = 300

export default function World (props) {
  const { globeConfig } = props

  const scene = new Scene()
  scene.fog = new Fog(0xffffff, 400, 2000)
  return (
    <Canvas id='canvasMain' scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)} style={{ width: '100%', maxWidth: '100%', minWidth: '100%' }}>
      <WebGLRenderer />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-400, 500, 50)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={globeConfig.autoRotate}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
        position={[0, 0, 0]}
        position0={[0, 0, 0]}
      />
    </Canvas>
  )
}
