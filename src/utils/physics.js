export function getAxisRotation ({x: axis1Delta, z: axis2Delta}) {
  let lineSlope = axis1Delta/axis2Delta
  return axis2Delta > 0 ? Math.atan(lineSlope) : Math.atan(lineSlope) + Math.PI
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
