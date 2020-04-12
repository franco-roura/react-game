import React from 'react'
import 'src/main-theme.scss'
import { Canvas } from 'react-three-fiber'
import RegularScene from 'src/components/organisms/RegularScene'

function App (props) {
  return (<div>
    <h1>The person simulator</h1>
    <p>
      In this incredible game you are an actual person, for real! And you can click to walk...
      Awesome, right?
    </p>
    <Canvas
      data-paper-resize
      style={{ height: '560px', width: '100vw' }}
      orthographic={true}
    >
      <RegularScene />
    </Canvas>
    <p>
      Disclaimer: You are not an actual person, you're a WebGL graphic made by <a href='http://quaternius.com'>a 3D designer called Quaternius</a> brought to life with ThreeJS and React Three Fiber.
    </p>
    <p>Yes, I made this "game" with React. Please support Quaternius so I can keep using his work for fun experiments.</p>
  </div>)
}

export default App
