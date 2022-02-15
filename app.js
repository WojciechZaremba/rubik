
const cubeScrambled = new Cube()
cubeScrambled.scramble()

const solver = new SolutionFinder(cubeScrambled)
solver.findAnyWall()
solver.solutionPath













//findSolution(cubeScrambled, console.log, "fwfwqfqwfeqwfwqfqwfwqfwfe")




window.addEventListener("keydown", (e)=>{
    if (e.key === "ArrowLeft") {
        cubeScrambled.undo()
    } else if (e.key === "ArrowUp") {
        cubeScrambled.redo()
    }
})



