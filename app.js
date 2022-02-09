console.log("test")

let cubeState = "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg"

// faces are collected left to right top to bottom
const faceWest = [0,1,2,3,4,5,6,7,8]
const faceSouth = faceWest.map(a => a + 9)
const faceEast = faceWest.map(a => a + 9 * 2)
const faceNorth = faceWest.map(a => a + 9 * 3)
const faceTop = faceWest.map(a => a + 9 * 4)
const faceBottom = faceWest.map(a => a + 9 * 5)

const faces = [faceWest, faceSouth, faceEast, faceNorth, faceTop, faceBottom]

// rings are collected clockwise
const ringWest = [  
    ...getLeft(faceTop),
                ...getLeft(faceSouth),
                ...getLeft(faceBottom),
                ...getRight(faceNorth)
                ]
const ringSouth = [  
    ...getRight(faceWest),
                ...getBottom(faceTop),
                ...getLeft(faceEast),
                ...getTop(faceBottom),
                ]
const ringEast = [  
                ...getLeft(faceTop),
                ...getLeft(faceSouth),
                ...getLeft(faceBottom),
                ...getRight(faceNorth)
                ]
const ringNorth = [  
    ...getLeft(faceTop),
                ...getLeft(faceSouth),
                ...getLeft(faceBottom),
                ...getRight(faceNorth)
            ]
const ringTop = [  
                ...getLeft(faceTop),
                ...getLeft(faceSouth),
                ...getLeft(faceBottom),
                ...getRight(faceNorth)
                ]
const ringBottom = [  
                ...getLeft(faceTop),
                ...getLeft(faceSouth),
                ...getLeft(faceBottom),
                ...getRight(faceNorth)
            ]
            
const rings = [ringWest, ringSouth, ringEast, ringNorth, ringTop, ringBottom]
                
function getLeft(face) { 
    return [face[0],face[3],face[6]]
}
function getRight(face) {
    return [face[8],face[5],face[2]]
}
function getTop(face) {
    return [face[2],face[1],face[0]]
}
function getBottom(face) {
    return [face[6],face[7],face[8]]
}

function debug() {
    const logs      = ["","",""]
    const logStyles = [[],[],[]]
    
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


const faceClock = [6,3,0,7,4,1,8,5,2]
const faceCounter = [2,5,8,1,4,7,0,3,6]



const moves = {
    turnClockWise: [[...faceWest], [...faceClock]],
    turnCounterClockWise: [[...faceWest], [...faceCounter]],
    west: {
        clock: [],
        counter: []
    },
    south: {
        clock: [],
        counter: []
    },
    east: {
        clock: [],
        counter: []
    },
    north: {
        clock: [],
        counter: []
    },
    top: {
        clock: [],
        counter: []
    },
    bottom: {
        clock: [],
        counter: []
    },
}