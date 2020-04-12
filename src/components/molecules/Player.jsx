import React, { Suspense } from 'react'
import MaleGoblin from 'src/assets/gltf/Goblin_Male.gltf'
import Render from 'src/assets/gltf/Male_Shirt.gltf'
import Model from 'src/components/atoms/Model'

function Player ({ rotation, position, isWalking }) {
  return <Suspense fallback={null}>
    {/*<Model position={position} url={MaleGoblin} rotationY={rotation}/>*/}
    <Model animated animationActive={isWalking} position={position} url={Render} rotationY={rotation}/>
  </Suspense>
}

export default Player
