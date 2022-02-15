
const cubeScrambled = new Cube()
cubeScrambled.scramble()















//findSolution(cubeScrambled, console.log, "fwfwqfqwfeqwfwqfqwfwqfwfe")




window.addEventListener("keydown", (e)=>{
    if (e.key === "ArrowLeft") {
        cubeScrambled.undo()
    } else if (e.key === "ArrowUp") {
        cubeScrambled.redo()
    }
})



