import React, { Suspense, useEffect, useState } from 'react'
import MaleGoblin from 'src/assets/gltf/Goblin_Male.gltf'
import Model from 'src/components/atoms/Model'

function Goblin (props) {
  const [pressedKeys, setPressedKeys] = useState([])
  const [position, setPosition] = useState([0, 0, 0])
  const [rotation, setRotation] = useState(0)
  const movementKeys = ['w', 'ArrowUp', 'a', 'ArrowLeft', 's', 'ArrowDown', 'd', 'ArrowRight']

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      if (movementKeys.includes(key) && !pressedKeys.includes(key)) {
        switch (key) {
          case 'ArrowUp':
          case 'w':
            setPosition([position[0], position[1] += 0.5, position[2]])
            setRotation(3.2)
            break
          case 'ArrowLeft':
          case 'a':
            setPosition([position[0] -= 0.5, position[1], position[2]])
            setRotation(4.5)
            break
          case 'ArrowDown':
          case 's':
            setPosition([position[0], position[1] -= 0.5, position[2]])
            setRotation(0)
            break
          case 'ArrowRight':
          case 'd':
            setPosition([position[0] += 0.5, position[1], position[2]])
            setRotation(1.5)
            break
        }
        setPressedKeys(previousPressedKeys => [...previousPressedKeys, key])
      }
    }

    const onKeyUp = ({ key }) => {
      if (movementKeys.includes(key)) {
        setPressedKeys(previousPressedKeys => {
          console.log(position)
          return previousPressedKeys.filter(k => k !== key)
        })
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return <Suspense fallback={null}>
    <Model position={position} url={MaleGoblin} rotationY={rotation}/>
  </Suspense>

}

export default Goblin
