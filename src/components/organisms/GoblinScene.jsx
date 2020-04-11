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

  _getPlayerRotation(stepX, stepZ) {
    const horizontal = { left: '-1', right: '1', not: '0' }
    const vertical = { down: '1', up: '-1', not: '0' }
    // TODO: Find a better way to do this.
    //  Arrays inside availableAxes wont work because indexOf does deep equal comparison
    const allDifferentAxes = [
      `${horizontal.not}, ${vertical.not}`,
      `${horizontal.right}, ${vertical.down}`,
      `${horizontal.right}, ${vertical.not}`,
      `${horizontal.right}, ${vertical.up}`,
      `${horizontal.not}, ${vertical.up}`,
      `${horizontal.left}, ${vertical.up}`,
      `${horizontal.left}, ${vertical.not}`,
      `${horizontal.left}, ${vertical.down}`,
      `${horizontal.not}, ${vertical.down}`,
    ]
    const stepDirection = `${stepX.toString()}, ${stepZ.toString()}`
    const axisDirection = allDifferentAxes.indexOf(stepDirection)
    return Math.PI * axisDirection / 4
  }

  walk (stepX, stepY) {
    const rotation = this._getPlayerRotation(stepX, stepY)

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
    const coords3d = {
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
