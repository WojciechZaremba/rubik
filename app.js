console.log("test")

let cubeState = "roooooooorwwwwwwwwyrrrrrrrrryyyyyyyyrbbbbbbbbrgggggggg"

// faces are collected left to right top to bottom
const faceWest = [0,1,2,3,4,5,6,7,8]
const faceSouth = faceWest.map(a => a + 9)
const faceEast = faceWest.map(a => a + 9 * 2)
const faceNorth = faceWest.map(a => a + 9 * 3)
const faceTop = faceWest.map(a => a + 9 * 4)
const faceBottom = faceWest.map(a => a + 9 * 5)


// rings are collected clockwise
const ringWest = [  
...getRight(faceNorth),
...getLeft(faceTop),
...getLeft(faceSouth),
...getLeft(faceBottom),
]
const ringSouth = [  
...getRight(faceWest),
...getDown(faceTop),
...getLeft(faceEast),
...getUp(faceBottom),
]
const ringEast = [  
...getRight(faceSouth),
...getRight(faceTop),
...getLeft(faceNorth),
...getRight(faceBottom)
]
const ringNorth = [  
...getRight(faceEast),
...getUp(faceTop),
...getLeft(faceWest),
...getDown(faceBottom)
]
const ringTop = [  
...getUp(faceWest),
...getUp(faceNorth),
...getUp(faceEast),
...getUp(faceSouth)
]
const ringBottom = [  
...getDown(faceWest),
...getDown(faceSouth),
...getDown(faceEast),
...getDown(faceNorth)
]

// facesDefault and ringsDefaut order must always be identical
const facesDefault = [faceWest, faceSouth, faceEast, faceNorth, faceTop, faceBottom]
const ringsDefault = [ringWest, ringSouth, ringEast, ringNorth, ringTop, ringBottom]
const ringsRotatedClockwise = []
const ringsRotatedCounterClockwise = []
ringsDefault.forEach(ring => {
    ringsRotatedClockwise
    .push(ring
        .slice(ring.length - 3)
        .concat(ring.slice(0, ring.length - 3))
        )
    ringsRotatedCounterClockwise
    .push(ring
        .slice(3, ring.length)
        .concat(ring.slice(0, 3))
        )
    })
const faceClock = [6,3,0,7,4,1,8,5,2]
const faceCounter = [2,5,8,1,4,7,0,3,6]
    
function getLeft(face) { 
    return [face[0], face[3], face[6]]
}
function getRight(face) {
    return [face[8], face[5], face[2]]
}
function getUp(face) {
    return [face[2], face[1], face[0]]
}
function getDown(face) {
    return [face[6], face[7], face[8]]
}

function debug(cubeState) {
    const logs      = ["", "", ""]
    const logStyles = [[], [], []]
    
    for (let i = 36; i < 45; i += 3) {
        logs[0] += `\n        ${cubeState.substring(i, i + 3)}`
    }
    for (let i = 0; i < 3; i++) {
        for (let j = i * 3; j < 36; j += 9) {
            logs[1] += ` ${cubeState.substring(j, j + 3)}`
        }
        logs[1] += "\n"
    }
    for (let i = 45; i < 54; i += 3) {
        logs[2] += `\n        ${cubeState.substring(i, i + 3)}`
    }

    logs[0] = logs[0].substring(1)
    logs[1] = logs[1].substring(0,logs[1].length - 1)
    logs[2] = logs[2].substring(1)

    for (let l = 0; l < logs.length; l++) {
        let temp = logs[l].split("")
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].match(/[owrybg]/)) {
                switch (temp[i]) {
                    case "o":
                        logStyles[l].push("color: orange")
                    break
                    case "w":
                        logStyles[l].push("color: gainsboro")
                    break
                    case "r":
                        logStyles[l].push("color: tomato")
                    break
                    case "y":
                        logStyles[l].push("color: gold")
                    break
                    case "b":
                        logStyles[l].push("color: cyan")
                    break
                    case "g":
                        logStyles[l].push("color: seagreen")
                    break
                }
                temp[i] = " %c" + temp[i]
            }
        }
        logs[l] = temp.join("")
        console.log(logs[l], ...logStyles[l])
    }
}

function rotor(faceName, currentState, direction) {
    let faceIdx = facesDefault.indexOf(faceName)
    let temp = currentState.split("")
    let diff = faceIdx * 9
    let properRotatedRings = ringsRotatedClockwise
    let properRotatedFace = faceClock
    if (direction === false) {
        properRotatedRings = ringsRotatedCounterClockwise
        properRotatedFace = faceCounter
    }

    for (let i = 0; i < properRotatedFace.length; i++) {
        temp[i + diff] = currentState[properRotatedFace[i] + diff]
    }
    for (let i = 0; i < properRotatedRings[0].length; i++) {
        temp[ringsDefault[faceIdx][i]] = currentState[properRotatedRings[faceIdx][i]]
    }

    return temp.join("")
}


class Cube {
    constructor(stateStr = "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg") {
        this.state = stateStr
        this.history = []
    }

    turn(command) {
        this.state = command.execute(this.state)
        this.history.push(command)
        this.log()
    }

    undo() {
        const command = this.history.pop()
        this.state = command.undo(this.state)
        this.log()
    }

    log() {
        console.log("")
        debug(this.state)
    }
}

class Turn {
    constructor(face, turnClockWise = true) {
        this.faceToRotate = face
        this.direction = turnClockWise
    }

    execute(currentState) {
        return rotor(this.faceToRotate, currentState, this.direction)
    }

    undo(currentState) {
        return rotor(this.faceToRotate, currentState, !this.direction)
    }
}


let cube = new Cube()
cube.turn(new Turn(faceTop, false))
cube.turn(new Turn(faceBottom, true))
cube.turn(new Turn(faceBottom, true))
cube.undo()
cube.undo()
cube.undo()







