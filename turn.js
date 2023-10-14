class Turn { // every turn will be served as an object created by this class
    constructor(face, turnClockWise = true, turn180 = false, step = "scrambling") {
        this.step = step
        this.faceToRotate = face
        this.direction = turnClockWise
        this.turn180 = turn180
    }
    execute(currentState) {
        console.log("step", this.step)
        return rotor(this.faceToRotate, currentState, indexes3x3, this.direction, this.turn180)
    }
    undo(currentState) {
        console.log("step", this.step)
        return rotor(this.faceToRotate, currentState, indexes3x3, !this.direction, this.turn180)
    }
}