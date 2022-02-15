function findSolution(cube, callback, c) {
    console.log(cube)
    callback(c)
}

class SolutionFinder {
    constructor(cubeToSolve) {
        this.cubeToSolve = cubeToSolve
        this.stateToSolve = this.cubeToSolve.state 
        this.solutionPath = [] 
    }
    findAnyWall() {
        if (this.cubeToSolve.state != this.stateToSolve) {
            this.cubeToSolve.state = this.stateToSolve
        }
        console.log("wall")
    }
}