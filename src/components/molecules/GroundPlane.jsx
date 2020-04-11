import React from 'react'
import {useLoader} from 'react-three-fiber'
import {TextureLoader, RepeatWrapping} from 'three'
import GrassTexture from 'src/assets/textures/grass.jpg'

function GroundPlane() {
  const texture = useLoader(TextureLoader, GrassTexture)
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(4, 4);
  const planeWidth = window.innerWidth / 60
  const planeHeight = planeWidth * 3/4
  return (
      <mesh receiveShadow={true} rotation={[0, 0, 0]} position={[0, 0, 0]}>
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
