import * as React from 'react'

// Lights
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={window.innerWidth}
      height={window.innerHeight}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
    />
  );
}
function DirectionalLight({ brightness, color }) {
  return (
    <directionalLight
      width={window.innerWidth}
      height={window.innerHeight}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow={true}
    />
  );
}

export {KeyLight, DirectionalLight}
