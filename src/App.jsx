import React from 'react'
import 'src/main-theme.scss'
import { Canvas } from 'react-three-fiber'
import GoblinScene from 'src/components/organisms/GoblinScene'

function App (props) {
  const framework = 'React'
  const canvasWidth = window.innerWidth * 0.8
  const canvasHeight = canvasWidth * 3/4
  return (<div>
    <p>I am a {framework} app.</p>
    <p>And this is a WebGL render: </p>
    <Canvas
      data-paper-resize
      style={{ background: 'gray', height: '40vw', width: '100vw' }}
      orthographic={true}
      camera={{ zoom: 60 }}
    >
      <GoblinScene/>
    </Canvas>
  </div>)
}

export default App
