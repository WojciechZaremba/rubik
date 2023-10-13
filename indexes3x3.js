console.log("indexes loaded")

// faces are collected left to right top to bottom (?)
const faceWest = [0,1,2,3,4,5,6,7,8] // orange
const faceSouth = faceWest.map(a => a + 9) // white
const faceEast = faceWest.map(a => a + 9 * 2) // red
const faceNorth = faceWest.map(a => a + 9 * 3) // yellow
const faceTop = faceWest.map(a => a + 9 * 4) // blue
const faceBottom = faceWest.map(a => a + 9 * 5) // green


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
const faceClock   = [6,3,0,7,4,1,8,5,2] // ??
const faceCounter = [2,5,8,1,4,7,0,3,6] // ??

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

const indexes3x3 = {
    facesDefault: facesDefault,
    faceClock: faceClock,
    faceCounter: faceCounter,
    ringsDefault: ringsDefault,
    ringsRotatedClockwise: ringsRotatedClockwise,
    ringsRotatedCounterClockwise: ringsRotatedCounterClockwise
}

const idxsSimpl = {

}

//console.log(rotor)
