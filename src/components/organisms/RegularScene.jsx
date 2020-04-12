import React, { Suspense } from 'react'

import Player from 'src/components/molecules/Player'
import GroundPlane from 'src/components/molecules/GroundPlane'
import Light from 'src/components/atoms/Light'
import { getAxisRotation, getVectorizedStep, sleep } from 'src/utils/physics'

class RegularScene extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playerIsWalking: false,
      playerPosition: [0, 0, 0],
      playerRotation: 0,
    }
    this.walk = this.walk.bind(this)
    this.onCanvasClick = this.onCanvasClick.bind(this)
  }

  walk (stepX, stepY) {
    const playerRotation = getAxisRotation(stepX, stepY)

    this.setState(state => ({
      ...state,
      playerPosition: [
        state.playerPosition[0] + stepX,
        0,
        state.playerPosition[2] + stepY,
      ],
      playerRotation
    }))
  }

  async onCanvasClick (e) {
    let { playerIsWalking, playerPosition } = this.state
    if (playerIsWalking) {
      return null
    } else {
      this.setState(state => ({ ...state, playerIsWalking: true }))
    }

    let currentPlayerPosition = {x: playerPosition[0], z: playerPosition[2]}
    const finalPlayerPosition = {
      x: Math.round(e.unprojectedPoint.x),
      z: Math.round((e.unprojectedPoint.z + 360) * 2.07 - 313)
    }

    while (
      finalPlayerPosition.x !== currentPlayerPosition.x ||
      finalPlayerPosition.z !== currentPlayerPosition.z
      ) {
      const vectorizedStep = getVectorizedStep(currentPlayerPosition, finalPlayerPosition)
      this.walk(vectorizedStep.x, vectorizedStep.z)
      currentPlayerPosition = {x: this.state.playerPosition[0], z: this.state.playerPosition[2]}
      await sleep(5)
    }

    this.setState(state => ({ ...state, playerIsWalking: false }))
  }

  render () {
    const { playerPosition, playerRotation, playerIsWalking } = this.state
    return <>
      <Light/>
      <Player isWalking={playerIsWalking} position={playerPosition} rotation={playerRotation}/>
      <Suspense fallback={null}>
        <GroundPlane onClick={this.onCanvasClick}/>
      </Suspense>
    </>
  }
}

export default RegularScene
