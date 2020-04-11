import React, { Suspense } from 'react'

import Goblin from 'src/components/molecules/Goblin'
import GroundPlane from 'src/components/molecules/GroundPlane'
import Light from 'src/components/atoms/Light'

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class GoblinScene extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      walking: false,
      position: [0, 0, 0],
      rotation: 0,
    }
    this.walk = this.walk.bind(this)
    this.onCanvasClick = this.onCanvasClick.bind(this)
  }

  _getRotation(stepX, stepZ) {
    const horizontal = {
      left: '-1',
      right: '1',
      not: '0',
    }
    const vertical = {
      down: '1',
      up: '-1',
      not: '0',
    }
    let rotation
    switch (`${stepX.toString()}/${stepZ.toString()}`) {
      case `${horizontal.not}/${vertical.down}`:
      case `${horizontal.not}/${vertical.not}`:
        rotation = 0
        break
      case `${horizontal.right}/${vertical.down}`:
        rotation = Math.PI / 4
        break
      case `${horizontal.right}/${vertical.not}`:
        rotation = Math.PI * 2 / 4
        break
      case `${horizontal.right}/${vertical.up}`:
        rotation = Math.PI * 3 / 4
        break
      case `${horizontal.not}/${vertical.up}`:
        rotation = Math.PI
        break
      case `${horizontal.left}/${vertical.up}`:
        rotation = Math.PI * 5 / 4
        break
      case `${horizontal.left}/${vertical.not}`:
        rotation = Math.PI * 6 / 4
        break
      case `${horizontal.left}/${vertical.down}`:
        rotation = Math.PI * 7 / 4
        break
      default:
    }
    return rotation
  }

  walk (stepX, stepY) {
    const rotation = this._getRotation(stepX, stepY)

    this.setState(state => ({
      ...state,
      position: [
        state.position[0] + stepX,
        0,
        state.position[2] + stepY,
      ],
      rotation
    }))
  }

  async onCanvasClick (e) {
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
      // x: Math.round((0.15 * (clickPercentage.x - 100) + 7.5) * 10) / 10,
      // y: Math.round((-0.06 * (clickPercentage.y - 100) - 3) * 10) / 10
      x: Math.round(e.unprojectedPoint.x),
      z: Math.round((e.unprojectedPoint.z + 360) * 2.07 - 313)
    }

    while (coords3d.x !== position[0] || coords3d.z !== position[2]) {
      const horizontalStep = Math.sign(coords3d.x - position[0])
      const verticalStep = Math.sign(coords3d.z - position[2])
      this.walk(horizontalStep, verticalStep)
      position = this.state.position
      await sleep(5)
    }
    this.setState(state => ({ ...state, walking: false }))
  }

  render () {
    const { position, rotation } = this.state
    return <>
      <Light/>
      <Goblin position={position} rotation={rotation}/>
      <Suspense fallback={null}>
        <GroundPlane onClick={this.onCanvasClick}/>
      </Suspense>
    </>
  }
}

export default GoblinScene
