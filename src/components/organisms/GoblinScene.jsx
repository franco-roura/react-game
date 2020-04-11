import * as React from 'react'
import { Suspense, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import Goblin from 'src/components/molecules/Goblin'
import GroundPlane from 'src/components/molecules/GroundPlane'

const Light = () => {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.DirectionalLight(0xffffff, 4)
  light.position.set(0, 0, 10)
  light.castShadow = true // default false
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 10 // default
  light.shadow.mapSize.height = 10 // default
  light.shadow.camera.near = 0.1 // default
  light.shadow.camera.far = 10 // default
  light.shadow.camera.top = -10 // default
  light.shadow.camera.right = 10 // default
  light.shadow.camera.left = -10 // default
  light.shadow.camera.bottom = 10 // default
  return <primitive object={light}/>
}

function GoblinScene ({ onClick }) {
  const onCanvasClick = (e) => {
    const clickPercentage = {
      x: e.pageX * 100 / window.innerWidth,
      y: e.pageY * 100 / (window.innerWidth * 0.4),
    }
    const coords3d = {
      x: 0.15 * (clickPercentage.x - 100) + 7.5,
      y: -0.06 * (clickPercentage.y - 100) - 3
    }
    walk([coords3d.x, coords3d.y, 0])
    console.log(coords3d)
  }
  const [position, walk] = useState([0, 0, 0])

  const { gl } = useThree()
  useFrame(() => {
    gl.shadowMap.type = THREE.PCFSoftShadowMap
    gl.shadowMap.enabled = true
  })
  return <>

    <Light/>
    <Goblin position={position} onSceneClick={onClick}/>
    <Suspense fallback={null}>
      <GroundPlane onClick={onCanvasClick}/>
    </Suspense>
  </>
}

export default GoblinScene
