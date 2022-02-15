
class Cube {
    constructor(stateStr = "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg") {
        this.state = stateStr
        this.history = []
        this.historyIndex = 0
    }
    turn(command) {
        this.state = command.execute(this.state)
        this.history.splice(this.historyIndex)
        this.history.push(command)
        this.historyIndex++
        // does the same as above
        // this.historyIndex = this.history.lenght
        // this.log()
    }
    undo() {
        // pop if don't want to store forward history
        // const command = this.history.pop() 
        if (this.historyIndex > 0) {
            this.historyIndex--
            const command = this.history[this.historyIndex]
            this.state = command.undo(this.state)
        }
        this.log()
    }
    redo() {
        if (this.historyIndex < this.history.length) {
            const command = this.history[this.historyIndex]
            this.state = command.execute(this.state)
            this.historyIndex++
        }
        this.log()
    }
    scramble() {
        let turns = Math.floor(Math.random() * 25 + 9)
        while (turns > 0) {
            let faceIdx = Math.floor(Math.random() * 6)
            this.turn(new Turn(facesDefault[faceIdx], Math.random() < 0.5))
            turns--
        }
        this.log()
    }
    log() {
        debug(this.state)
    }
}

class Turn {
    constructor(face, turnClockWise = true) {
        this.faceToRotate = face
        this.direction = turnClockWise
    }
    execute(currentState) {
        return rotor(this.faceToRotate, currentState, this.direction, indexes3x3)
    }
    undo(currentState) {
        return rotor(this.faceToRotate, currentState, !this.direction, indexes3x3)
    }
}

