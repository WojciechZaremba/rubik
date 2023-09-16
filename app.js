console.log("app loaded")


const cubeScrambled = new Cube()
cubeScrambled.log()
cubeScrambled.scramble()

const solver = new SolutionFinder(cubeScrambled)

window.addEventListener("keydown", (e) => {
    if (e.key !== "Control" &&
         e.key !== "Shift" &&
         e.key !== "I" &&
         e.key !== "m" &&
         e.key !== "n" &&
         e.key !== "Alt") {
        console.log(e.key)
        e.preventDefault()
    }
    if (e.key === "ArrowLeft") {
        cubeScrambled.undo()
    } else if (e.key === "ArrowUp") {
        cubeScrambled.redo()
    }
    switch(e.key) {
        case "a":
        case "A":
            cubeScrambled.turn(new Turn(faceWest, e.shiftKey, e.altKey), true)
        break
        case "s":
        case "S":
            cubeScrambled.turn(new Turn(faceSouth, e.shiftKey, e.altKey), true)
        break
        case "d":
        case "D":
            cubeScrambled.turn(new Turn(faceEast, e.shiftKey, e.altKey), true)
        break
        case "f":
        case "F":
            cubeScrambled.turn(new Turn(faceNorth, e.shiftKey, e.altKey), true)
        break
        case "w":
        case "W":
            cubeScrambled.turn(new Turn(faceTop, e.shiftKey, e.altKey), true)
        break
        case "x":
        case "X":
            cubeScrambled.turn(new Turn(faceBottom, e.shiftKey, e.altKey), true)
        break
        case "z":
        case "Z":
            solver.scrambleAgain()
        break
        case "q":
            cubeScrambled.instaSolve()
        break
        case "n":
        case "N":
            // w0cornerSpin(e.shiftKey)
            // whiteCornerSpin(0 , e.shiftKey);
            e.altKey ? sequence("magicSeven", 0, e.shiftKey) : sequence("cornerSpin", 0, e.shiftKey)
        break
        case "m":
        case "M":
            // w1cornerSpin(e.shiftKey)
            // whiteCornerSpin(1 , e.shiftKey)
            e.altKey ? sequence("magicSeven", 1, e.shiftKey) : sequence("cornerSpin", 1, e.shiftKey)
        break
        case "k":
        case "K":
            // w2cornerSpin(e.shiftKey)
            // whiteCornerSpin(2 , e.shiftKey)
            e.altKey ? sequence("magicSeven", 2, e.shiftKey) : sequence("cornerSpin", 2, e.shiftKey)
        break
        case "j":
        case "J":
            // w3cornerSpin(e.shiftKey)
            // whiteCornerSpin(3 , e.shiftKey)
            e.altKey ? sequence("magicSeven", 3, e.shiftKey) : sequence("cornerSpin", 3, e.shiftKey)
        break
    }
})

function sequence(sequenceType = "", cornerNum = 0, shift = Boolean) {
    let sequenceLeft = null
    let sequenceRight = null
    const sequenceBottom = faceNorth // yellow
    // discrepancy due to the not starting with the blue (top) wall, so from now white is the top
    // just use colors as a guide
    // consider renaming everything to match colors
    switch (cornerNum) {
        case 0:
            sequenceRight = faceBottom // green
            sequenceLeft = faceWest // orange
        break
        case 1:
            sequenceRight = faceEast // red
            sequenceLeft = faceBottom // green
        break
        case 2:
            sequenceRight = faceTop  // blue
            sequenceLeft = faceEast // red
        break
        case 3:
            sequenceRight = faceWest // orange
            sequenceLeft = faceTop // blue
        break
    }
    switch (sequenceType) {
        case "magicSeven":
           cubeScrambled.turn(new Turn(shift ? sequenceLeft : sequenceRight, shift), true);
           cubeScrambled.turn(new Turn(sequenceBottom, !shift), true);
           cubeScrambled.turn(new Turn(shift ? sequenceLeft : sequenceRight, !shift), true);
           cubeScrambled.turn(new Turn(sequenceBottom, !shift), true);
           cubeScrambled.turn(new Turn(shift ? sequenceRight : sequenceLeft, !shift), true);
           cubeScrambled.turn(new Turn(sequenceBottom, shift), true);
           cubeScrambled.turn(new Turn(shift ? sequenceRight : sequenceLeft, shift), true);
        break
        case "cornerSpin":
            cubeScrambled.turn(new Turn(shift ? sequenceRight : sequenceLeft, !shift), true);
            cubeScrambled.turn(new Turn(sequenceBottom, shift), true);
            cubeScrambled.turn(new Turn(shift ? sequenceRight : sequenceLeft, shift), true);
            cubeScrambled.turn(new Turn(sequenceBottom, !shift), true);
            cubeScrambled.turn(new Turn(shift ? sequenceRight : sequenceLeft, !shift), true);
            cubeScrambled.turn(new Turn(sequenceBottom, shift), true);
            cubeScrambled.turn(new Turn(shift ? sequenceRight : sequenceLeft, shift), true);
        break
    }
}

function swapBottomTeeth(cornerNum, reverse = false) {
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, reverse)
    sequence("magicSeven", cornerNum, reverse)
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, !reverse)
}
function messWithBottomCorners(cornerNum, reverse = false) {
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, !reverse)
}
function asymmetricBottomSwap(cornerNum, reverse = false) {
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, !reverse)
    cubeScrambled.turn(new Turn(faceNorth, reverse, true), true)
    sequence("magicSeven", cornerNum, !reverse)
    sequence("magicSeven", cornerNum, !reverse)
    cubeScrambled.turn(new Turn(faceNorth, reverse, true), true)
    sequence("magicSeven", cornerNum, reverse)
    sequence("magicSeven", cornerNum, reverse)
    swapBottomTeeth(cornerNum + 1 > 3 ? 0 : cornerNum + 1)
}