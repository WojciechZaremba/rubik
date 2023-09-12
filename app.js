console.log("app loaded")


const cubeScrambled = new Cube()
cubeScrambled.log()
cubeScrambled.scramble()

const solver = new SolutionFinder(cubeScrambled)

window.addEventListener("keydown", (e) => {
    if (e.key !== "Shift") console.log(e.key)
    e.preventDefault()
    if (e.key === "ArrowLeft") {
        cubeScrambled.undo()
    } else if (e.key === "ArrowUp") {
        cubeScrambled.redo()
    }
    switch(e.key) {
        case "o":
        case "O":
            cubeScrambled.turn(new Turn(faceWest, e.shiftKey, e.altKey), true)
        break
        case "w":
        case "W":
            cubeScrambled.turn(new Turn(faceSouth, e.shiftKey, e.altKey), true)
        break
        case "r":
        case "D":
            cubeScrambled.turn(new Turn(faceEast, e.shiftKey, e.altKey), true)
        break
        case "y":
        case "Y":
            cubeScrambled.turn(new Turn(faceNorth, e.shiftKey, e.altKey), true)
        break
        case "b":
        case "B":
            cubeScrambled.turn(new Turn(faceTop, e.shiftKey, e.altKey), true)
        break
        case "g":
        case "G":
            cubeScrambled.turn(new Turn(faceBottom, e.shiftKey, e.altKey), true)
        break
        case "z":
        case "Z":
            cubeScrambled.scramble()
        break
        case "q":
            cubeScrambled.instaSolve()
        break
    }
})
