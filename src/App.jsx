import React from 'react'
import 'src/main-theme.scss'
import { Canvas } from 'react-three-fiber'
import GoblinScene from 'src/components/organisms/GoblinScene'

function App (props) {
  return (<div>
    <Canvas
      data-paper-resize
      style={{ height: '40vw', width: '100vw' }}
      orthographic={true}
      camera={{ zoom: 60 }}
    >
      <GoblinScene/>
    </Canvas>
  </div>)
}

export default App
