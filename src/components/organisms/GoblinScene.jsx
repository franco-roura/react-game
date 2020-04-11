import * as React from 'react'
import {useFrame, useThree} from 'react-three-fiber'
import * as THREE from 'three'
import Goblin from 'src/components/molecules/Goblin'
import GroundPlane from 'src/components/molecules/GroundPlane'
import { Suspense } from 'react'

const Light = () => {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.DirectionalLight(0xffffff, 4)
  light.position.set(0, 0, 10)
  light.castShadow = true // default false
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 10 // default
  light.shadow.mapSize.height =10 // default
  light.shadow.camera.near = 0.1 // default
  light.shadow.camera.far = 10 // default
  light.shadow.camera.top = -10 // default
  light.shadow.camera.right = 10 // default
  light.shadow.camera.left = -10 // default
  light.shadow.camera.bottom = 10 // default
  return <primitive object={light} />
}

function GoblinScene (props) {
  const { gl } = useThree()
  useFrame(() => {
    gl.shadowMap.type = THREE.PCFSoftShadowMap
    gl.shadowMap.enabled = true
  })
  return <>
      <Light/>
      <Goblin/>
    <Suspense fallback={<mesh />}>
      <GroundPlane/>
    </Suspense>
    </>
}

export default GoblinScene
