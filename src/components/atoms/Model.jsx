import React, { useMemo, useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

function Model (props) {
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, props.url)
  const model = gltf.scene

  if (props.animated) {
    const mixer = useMemo(() => new THREE.AnimationMixer(model), [model])
    const walkAnimation = gltf.animations[10]
    const mixerClip = mixer.clipAction(walkAnimation)
    useMemo(() => {
        if (props.animationActive) {
          mixerClip.play()
        } else {
          mixerClip.stop()
        }
      },
      [props.animationActive]
    )
    useFrame((state, delta) => mixer.update(delta))
  }

  return (
    <primitive
      {...props}
      object={model}
      ref={mesh}
      rotation={[0, props.rotationY, 0]}
      scale={[50, 50, 50]}
      dispose={null}
    />
  )
}

export default Model
