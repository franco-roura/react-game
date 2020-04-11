import * as React from 'react'
import { Suspense } from 'react'
import * as THREE from 'three'
import Goblin from 'src/components/molecules/Goblin'
import GroundPlane from 'src/components/molecules/GroundPlane'

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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

class GoblinScene extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      walking: false,
      position: [0, 0, 0]
    }
    this.walk = this.walk.bind(this)
    this.onCanvasClick = this.onCanvasClick.bind(this)
  }

  walk(stepX, stepY) {
    this.setState(state => ({
      ...state,
      position: [
        Math.round((state.position[0] + stepX) * 10) / 10,
        Math.round((state.position[1] + stepY) * 10) / 10,
        0
      ]
    }))
  }

  async onCanvasClick(e) {
    let { walking, position } = this.state

    if (walking) {
      return null
    } else {
      this.setState(state => ({ ...state, walking: true }))
    }
    const clickPercentage = {
      x: e.pageX * 100 / window.innerWidth,
      y: e.pageY * 100 / (window.innerWidth * 0.4),
    }
    const coords3d = {
      x: Math.round((0.15 * (clickPercentage.x - 100) + 7.5) * 10) / 10,
      y: Math.round((-0.06 * (clickPercentage.y - 100) - 3) * 10) / 10
    }
    while (coords3d.x !== position[0] || coords3d.y !== position[1]) {
      const horizontalStep = 0.1 * Math.sign(coords3d.x - position[0])
      const verticalStep = 0.1 * Math.sign(coords3d.y - position[1])
      this.walk(horizontalStep, verticalStep)
      position = this.state.position
      await sleep(17)
    }
    console.log('I walked')
    this.setState(state => ({ ...state, walking: false }))
  }

  render () {
    const { position } = this.state
    return <>
      <Light/>
      <Goblin position={position}/>
      <Suspense fallback={null}>
        <GroundPlane onClick={this.onCanvasClick}/>
      </Suspense>
    </>
  }
}

export default GoblinScene
