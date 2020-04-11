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

  _getRotation(stepX, stepY) {
    const horizontal = {
      left: '-0.1',
      right: '0.1',
      not: '0',
    }
    const vertical = {
      down: '-0.1',
      up: '0.1',
      not: '0',
    }
    let rotation
    switch (`${stepX.toString()}/${stepY.toString()}`) {
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
        Math.round((state.position[0] + stepX) * 10) / 10,
        Math.round((state.position[1] + stepY) * 10) / 10,
        0
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
