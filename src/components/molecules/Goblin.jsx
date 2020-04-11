import React, { Suspense } from 'react'
import MaleGoblin from 'src/assets/gltf/Goblin_Male.gltf'
import Model from 'src/components/atoms/Model'

function Goblin ({ rotation, position }) {
  return <Suspense fallback={null}>
    <Model position={position} url={MaleGoblin} rotationY={rotation}/>
  </Suspense>
}

export default Goblin
