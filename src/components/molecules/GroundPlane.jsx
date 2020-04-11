import React from 'react'
import {useLoader} from 'react-three-fiber'
import {TextureLoader, RepeatWrapping} from 'three'
import GrassTexture from 'src/assets/textures/grass.jpg'

function GroundPlane({onClick}) {
  const texture = useLoader(TextureLoader, GrassTexture)
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(4, 4);
  const planeWidth = 1000
  const planeHeight = planeWidth * 3/4
  return (
      <mesh receiveShadow={true} rotation={[-(Math.PI/2), 0, 0]} position={[0, 0, 0]} onClick={onClick}>
        <planeBufferGeometry attach="geometry" args={[planeWidth, planeHeight]} />
        <meshStandardMaterial
          attach="material"
          color="#28292c"
          map={texture}
          penumbra={1}
        />
      </mesh>
  );
}

export default GroundPlane
