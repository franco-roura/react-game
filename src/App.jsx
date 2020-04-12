import React, { useEffect, useRef } from 'react'
import 'src/main-theme.scss'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import GoblinScene from 'src/components/organisms/GoblinScene'

function Camera(props) {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld())
  return <orthographicCamera ref={ref} {...props}/>
}

function App (props) {
  return (<div>
    <Canvas
      data-paper-resize
      style={{ height: '100vh', width: '100vw' }}
      orthographic={true}
    >
      {/*<Camera position={[0, 500, 0]} rotation={[-Math.PI/2, 0, 0]}/>*/}
      <Camera position={[0, 500, 500]} rotation={[-Math.PI/4, 0, 0]}/>
      <GoblinScene />
    </Canvas>
  </div>)
}

export default App
