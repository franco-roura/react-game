import React, { useRef, useState } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model (props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  const gltf = useLoader(GLTFLoader, props.url)

  return (
      <primitive
        {...props}
        object={gltf.scene}
        ref={mesh}
        rotation={[-5.4, props.rotationY, 0]}
        dispose={null}
      />
  )
}

export default Model
