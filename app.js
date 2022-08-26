console.log("app loaded")


const cubeScrambled = new Cube()
cubeScrambled.log()
cubeScrambled.scramble()

const solver = new SolutionFinder(cubeScrambled)

window.addEventListener("keydown", (e) => {
    e.preventDefault()
    if (e.key === "ArrowLeft") {
        cubeScrambled.undo()
    } else if (e.key === "ArrowUp") {
        cubeScrambled.redo()
    }
    switch(e.key) {
        case "a":
        case "A":
            cubeScrambled.turn(new Turn(faceWest, e.shiftKey, e.altKey))
        break
        case "s":
        case "S":
            cubeScrambled.turn(new Turn(faceSouth, e.shiftKey, e.altKey))
        break
        case "d":
        case "D":
            cubeScrambled.turn(new Turn(faceEast, e.shiftKey, e.altKey))
        break
        case "f":
        case "F":
            cubeScrambled.turn(new Turn(faceNorth, e.shiftKey, e.altKey))
        break
        case "w":
        case "W":
            cubeScrambled.turn(new Turn(faceTop, e.shiftKey, e.altKey))
        break
        case "x":
        case "X":
            cubeScrambled.turn(new Turn(faceBottom, e.shiftKey, e.altKey))
        break
        case "q":
            cubeScrambled.instaSolve()
        break
    }
})
