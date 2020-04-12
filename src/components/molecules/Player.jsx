import React, { Suspense } from 'react'
import Render from 'src/assets/gltf/Male_Shirt.gltf'
import Model from 'src/components/atoms/Model'

function Player ({ rotation, position, isWalking }) {
  return <Suspense fallback={null}>
    <Model animated animationActive={isWalking} position={position} url={Render} rotationY={rotation}/>
  </Suspense>
}

export default Player
