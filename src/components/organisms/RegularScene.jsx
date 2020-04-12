import React, { Suspense } from 'react'

import Player from 'src/components/molecules/Player'
import GroundPlane from 'src/components/molecules/GroundPlane'
import Light from 'src/components/atoms/Light'
import { getAxisRotation, getVectorizedStep, sleep } from 'src/utils/physics'
import Camera from 'src/components/atoms/Camera'

class RegularScene extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerIsWalking: false,
      playerPosition: [0, 0, 0],
      playerRotation: 0,
    }
    this.walk = this.walk.bind(this)
    this.onCanvasClick = this.onCanvasClick.bind(this)
  }

  walk(stepVector, playerRotation) {
    this.setState(state => ({
      ...state,
      playerPosition: [
        state.playerPosition[0] + stepVector.x,
        0,
        state.playerPosition[2] + stepVector.z,
      ],
      playerRotation
    }))
  }

  async onCanvasClick(e) {
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
      const playerRotation = getAxisRotation(vectorizedStep)
      this.walk(vectorizedStep, playerRotation)
      currentPlayerPosition = {x: this.state.playerPosition[0], z: this.state.playerPosition[2]}
      await sleep(5)
    }

    this.setState(state => ({ ...state, playerIsWalking: false }))
  }

  render() {
    const { playerPosition, playerRotation, playerIsWalking } = this.state
    return <>
      <Camera position={[0, 500, 500]} rotation={[-Math.PI/4, 0, 0]}/>
      <Light/>
      <Player isWalking={playerIsWalking} position={playerPosition} rotation={playerRotation}/>
      <Suspense fallback={null}>
        <GroundPlane onClick={this.onCanvasClick}/>
      </Suspense>
    </>
  }
}

export default RegularScene
