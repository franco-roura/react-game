import React, { Suspense, useEffect, useState } from 'react'
import MaleGoblin from 'src/assets/gltf/Goblin_Male.gltf'
import Model from 'src/components/atoms/Model'

function Goblin ({onSceneClick, position}) {
  const [rotation, setRotation] = useState(0)


  return <Suspense fallback={null}>
    <Model position={position} url={MaleGoblin} rotationY={rotation}/>
  </Suspense>
}

export default Goblin
