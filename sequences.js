function spinRight(relativeRight, relativeBottom, state) {
    let stateSpinR = rotor(relativeRight, state, indexes3x3, false)
        stateSpinR = rotor(relativeBottom, stateSpinR, indexes3x3, true)
        stateSpinR = rotor(relativeRight, stateSpinR, indexes3x3, true)
        stateSpinR = rotor(relativeBottom, stateSpinR, indexes3x3, false)
        stateSpinR = rotor(relativeRight, stateSpinR, indexes3x3, false)
        stateSpinR = rotor(relativeBottom, stateSpinR, indexes3x3, true)
        stateSpinR = rotor(relativeRight, stateSpinR, indexes3x3, true)
    return stateSpinR
}
function spinLeft(relativeLeft, relativeBottom, state) {
    let stateSpinL = rotor(relativeLeft, state, indexes3x3, true)
        stateSpinL = rotor(relativeBottom, stateSpinL, indexes3x3, false)
        stateSpinL = rotor(relativeLeft, stateSpinL, indexes3x3, false)
        stateSpinL = rotor(relativeBottom, stateSpinL, indexes3x3, true)
        stateSpinL = rotor(relativeLeft, stateSpinL, indexes3x3, true)
        stateSpinL = rotor(relativeBottom, stateSpinL, indexes3x3, false)
        stateSpinL = rotor(relativeLeft, stateSpinL, indexes3x3, false)
    return stateSpinL
}
function magicSevenRight(state, relativeRight, relativeBottom, relativeLeft) {
    let magicSevenR = rotor(relativeRight, state, indexes3x3, false)
        magicSevenR = rotor(relativeBottom, magicSevenR, indexes3x3, true)
        magicSevenR = rotor(relativeRight, magicSevenR, indexes3x3, true)
        magicSevenR = rotor(relativeBottom, magicSevenR, indexes3x3, true)
        magicSevenR = rotor(relativeLeft, magicSevenR, indexes3x3, true)
        magicSevenR = rotor(relativeBottom, magicSevenR, indexes3x3, false)
        magicSevenR = rotor(relativeLeft, magicSevenR, indexes3x3, false)
    return magicSevenR
}
function magicSevenLeft(state, relativeRight, relativeBottom, relativeLeft) {
    let magicSevenL = rotor(relativeLeft, state, indexes3x3, true)
        magicSevenL = rotor(relativeBottom, magicSevenL, indexes3x3, false)
        magicSevenL = rotor(relativeLeft, magicSevenL, indexes3x3, false)
        magicSevenL = rotor(relativeBottom, magicSevenL, indexes3x3, false)
        magicSevenL = rotor(relativeRight, magicSevenL, indexes3x3, false)
        magicSevenL = rotor(relativeBottom, magicSevenL, indexes3x3, true)
        magicSevenL = rotor(relativeRight, magicSevenL, indexes3x3, true)
    return magicSevenL
}