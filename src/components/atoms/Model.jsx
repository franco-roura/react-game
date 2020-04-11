import React, { useRef, useState } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model (props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  const gltf = useLoader(GLTFLoader, props.url)

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  return (
      <primitive
        {...props}
        object={gltf.scene}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        rotation={[-5.2, props.rotationY, 0]}
        dispose={null}
        onClick={e => {
          setActive(!active)
          console.log(mesh.current.rotation)
        }}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}
      />
  )
}

export default Model
