
function rotor(faceName, currentState, direction, indexes) {
    let faceIdx = indexes.facesDefault.indexOf(faceName)
    let temp = currentState.split("")
    let diff = faceIdx * 9
    let properRotatedRings = indexes.ringsRotatedClockwise
    let properRotatedFace = indexes.faceClock
    if (direction === false) {
        properRotatedRings = indexes.ringsRotatedCounterClockwise
        properRotatedFace = indexes.faceCounter
    }

    for (let i = 0; i < properRotatedFace.length; i++) {
        temp[i + diff] = currentState[properRotatedFace[i] + diff]
    }
    for (let i = 0; i < properRotatedRings[0].length; i++) {
        temp[ringsDefault[faceIdx][i]] = currentState[properRotatedRings[faceIdx][i]]
    }

    return temp.join("")
}
