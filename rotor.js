
function rotor(faceToTurn, currentState, direction = true, indexes = indexes3x3) {
    let faceIdx = indexes.facesDefault.indexOf(faceToTurn)
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

