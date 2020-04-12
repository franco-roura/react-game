export function getAxisRotation (axis1Delta, axis2Delta) {
  const horizontal = { left: '-1', right: '1', not: '0' }
  const vertical = { down: '1', up: '-1', not: '0' }
  // TODO: Find a better way to do this.
  //  Arrays inside availableAxes wont work because indexOf does deep equal comparison
  const allDifferentAxes = [
    `${horizontal.not}, ${vertical.not}`,
    `${horizontal.right}, ${vertical.down}`,
    `${horizontal.right}, ${vertical.not}`,
    `${horizontal.right}, ${vertical.up}`,
    `${horizontal.not}, ${vertical.up}`,
    `${horizontal.left}, ${vertical.up}`,
    `${horizontal.left}, ${vertical.not}`,
    `${horizontal.left}, ${vertical.down}`,
    `${horizontal.not}, ${vertical.down}`,
  ]
  const stepDirection = `${axis1Delta.toString()}, ${axis2Delta.toString()}`
  const axisDirection = allDifferentAxes.indexOf(stepDirection)
  return Math.PI * axisDirection / 4
}

export async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getVectorizedStep(pointA, pointB) {
  const deltaX = pointB.x - pointA.x, deltaZ = pointB.z - pointA.z
  const absDeltaX = Math.abs(deltaX), absDeltaZ = Math.abs(deltaZ)
  const biggerDelta = Math.max(absDeltaX, absDeltaZ)
  const smallerDelta = Math.min(absDeltaX, absDeltaZ)

  const mostlyHorizontal = biggerDelta === absDeltaX
  const shortStep = smallerDelta/biggerDelta
  return {
    x: (mostlyHorizontal ? 1 : shortStep) * Math.sign(deltaX),
    z: (mostlyHorizontal ? shortStep : 1) * Math.sign(deltaZ),
  }
}
