import * as React from 'react'
import * as THREE from 'three'

// Lights
const Light = (props) => {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.DirectionalLight(0xffffff, 4)
  light.position.set(0, 100, 100)
  Object.assign(light, {
    castShadow: true,
    shadow: {
      width: 10,
      height: 10
    },
    camera: {
      near: 0.1,
      far: 10,
      top: -10,
      right: 10,
      left: -10,
      bottom: 10,
    }
  })
  return <primitive object={light}/>
}

export default Light
