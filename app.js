console.log("app loaded")


const cubeScrambled = new Cube()
cubeScrambled.log()
cubeScrambled.scramble()

const solver = new SolutionFinder(cubeScrambled)

window.addEventListener("keydown", (e) => {
    if (e.key !== "Control" && e.key !== "Shift" && e.key !== "I" && e.key !== "m" && e.key !== "n") {
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
            whiteCornerSpin(0 , e.shiftKey)
        break
        case "m":
        case "M":
            // w1cornerSpin(e.shiftKey)
            whiteCornerSpin(1 , e.shiftKey)
        break
        case "k":
        case "K":
            // w2cornerSpin(e.shiftKey)
            whiteCornerSpin(2 , e.shiftKey)
        break
        case "j":
        case "J":
            // w3cornerSpin(e.shiftKey)
            whiteCornerSpin(3 , e.shiftKey)
        break
    }
})

function whiteCornerSpin(corner, shift) {
    let leftWall = ""
    let rightWall = ""
    const bottomWall = "f" // yellow
    switch (corner) {
        case 0:
            rightWall = "x"  // green
            leftWall = "a" // orange
        break
        case 1:
            rightWall = "d"  // red
            leftWall = "x" // green
        break
        case 2:
            rightWall = "w"  // blue
            leftWall = "d" // red
        break
        case 3:
            rightWall = "a"  // orange
            leftWall = "w" // blue
        break
    }
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? rightWall : leftWall}`, 'shiftKey': !shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${bottomWall}`, 'shiftKey': shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? rightWall : leftWall}`, 'shiftKey': shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${bottomWall}`, 'shiftKey': !shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? rightWall : leftWall}`, 'shiftKey': !shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${bottomWall}`, 'shiftKey': shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? rightWall : leftWall}`, 'shiftKey': shift}));
}

function magicSeven(corner, shift) {
    let leftWall = ""
    let rightWall = ""
    const bottomWall = "f" // yellow
    switch (corner) {
        case 0:
            rightWall = "x"  // green
            leftWall = "a" // orange
        break
        case 1:
            rightWall = "d"  // red
            leftWall = "x" // green
        break
        case 2:
            rightWall = "w"  // blue
            leftWall = "d" // red
        break
        case 3:
            rightWall = "a"  // orange
            leftWall = "w" // blue
        break
    }
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? leftWall : rightWall}`, 'shiftKey': shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${bottomWall}`, 'shiftKey': !shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? leftWall : rightWall}`, 'shiftKey': !shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${bottomWall}`, 'shiftKey': !shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? rightWall : leftWall}`, 'shiftKey': !shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${bottomWall}`, 'shiftKey': shift}));
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':`${shift ? rightWall : leftWall}`, 'shiftKey': shift}));
}

// function w0cornerSpin(clockwise) {
//     if (clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x', 'shiftKey': true}));
//     } else if (!clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
//     }
// }
// function w1cornerSpin(clockwise) {
//     if (clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d', 'shiftKey': true}));
//     } else if (!clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'x'}));
//     }
// }
// function w2cornerSpin(clockwise) {
//     if (clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w', 'shiftKey': true}));
//     } else if (!clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'d'}));
//     }
// }
// function w3cornerSpin(clockwise) {
//     if (clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'a', 'shiftKey': true}));
//     } else if (!clockwise) {
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w', 'shiftKey': true}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'f'}));
//         window.dispatchEvent(new KeyboardEvent('keydown',{'key':'w'}));
//     }
// }
