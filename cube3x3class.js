console.log("cube class loaded")

class Cube {
    constructor(stateStr = "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg") { // the cube starts with solved state
        this.state = stateStr
        this.history = []
        this.historyIndex = 0 // player can move back and forth through the history
        this.scramblingMoves = 0
    }
    turn(command, log = false) {
        this.state = command.execute(this.state)
        this.history.splice(this.historyIndex) // delete history after the index (?)
        this.history.push(command) // add new turn to the history
        this.historyIndex++
        //if (log) this.log()
        // does the same as above: (this.historyIndex++ ?)
        // this.historyIndex = this.history.lenght
        //this.log()
    }
    undo() {
        // pop if don't want to store forward history
        // const command = this.history.pop() 
        if (this.historyIndex > 0) { // UNDO moves one by one with Command Pattern
            this.historyIndex--
            const command = this.history[this.historyIndex]
            this.state = command.undo(this.state)
            this.log()
        } else { console.log("no history left")}
    }
    redo() {
        if (this.historyIndex < this.history.length) { // REDO moves one by one with Command Pattern
            const command = this.history[this.historyIndex]
            this.state = command.execute(this.state)
            this.historyIndex++
            this.log()
        } else { console.log("no history right") }
    }
    instaSolve() {
        this.state = "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg"
        this.history = []
        this.historyIndex = 0
        this.log()
    }
    scramble() {
        //this.log()
        let turnsLeft = Math.floor(Math.random() * 25 + 9) // arbitrary range of random moves
        this.scramblingMoves = turnsLeft
        console.log("scrambling with", turnsLeft, "moves")
        while (turnsLeft > 0) {
            let faceIdx = Math.floor(Math.random() * 6) // choose random side to turn
            this.turn(new Turn(facesDefault[faceIdx], Math.random() < 0.5)) // true below 0.5; faces are in indexes3x3 file
            turnsLeft--
        }
        this.log()
    }
    log() {
        debug(this.state)
    }
}



