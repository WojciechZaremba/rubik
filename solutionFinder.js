function findSolution(cube, callback, c) {
    console.log(cube)
    callback(c)
}

class SolutionFinder {
    constructor(cubeToSolve) {
        this.cubeToSolve = cubeToSolve
        this.stateToSolve = this.cubeToSolve.state 
        this.solution = {}
        this.solutionPath = []
        this.patterns = {
            orange: "ooooooooow..w..w.............y..y..yb..b..b..g..g..g..",
            white:  "..o..o..owwwwwwwwwr..r..r.................bbbggg......",
            red:    "...........w..w..wrrrrrrrrry..y..y....b..b..b..g..g..g",
            yellow: "o..o..o.............r..r..ryyyyyyyyybbb............ggg",
            blue:   "ooo......www......rrr......yyy......bbbbbbbbb.........",
            green:  "......ooo......www......rrr......yyy.........ggggggggg",
            whiteCross: ".....o....w.www.w....r.....................b..g......."
        }
    }
    debugPatterns() {
        Object.keys(solver.patterns).forEach(color => {
            let cube = new Cube(this.patterns[color])
            console.log(color + ":")
            cube.log()
        })
    }
    findAnyWall() {
        if (this.cubeToSolve.state != this.stateToSolve) {
            this.stateToSolve = this.cubeToSolve.state
        }
        console.log("wall")
    }
    search() {
        let t0 = performance.now()
        if (this.cubeToSolve.state != this.stateToSolve) this.stateToSolve = this.cubeToSolve.state

        const root = {
            depth: 0,
            id: 0,
            state: this.stateToSolve,
            prevMove: {
                face: null,
                direction: null
            },
            parent: {
                state: ""
            },
            children: []
        }
        
        const faces = indexes3x3.facesDefault
        
        const nodeHistory = []

        const queue = [root]
        let keepSearching = true
        let nodeId = 0
        
        const boundSolutionHandler = handleSolutionNode.bind(this)

        while (queue.length > 0 && keepSearching) {
            
            const parentNode = queue[0]
            if (parentNode.depth >= 4 || queue.length > 300000) {
            //if (parentNode.depth >= 5) {
                keepSearching = false
                console.log((performance.now() - t0) / 1000 + " sec")
                break
            } 

            if (checkIfSolved(queue[0].state, this.patterns.white)) {
                this.solution = queue[0]
                console.log("a solution has been found")
                keepSearching = false
                break
            }

            for (let i = 0; i < faces.length; i++) {
                let face = faces[i]
                let boolRight = true
                let boolLeft = false
                let state = queue[0].state
                let stateTurnRight = rotor(face, state, boolRight)
                let stateTurnLeft = rotor(face, state, boolLeft)
                
                const nodeRight = {
                    depth: parentNode.depth + 1,
                    id: undefined,
                    state: stateTurnRight,
                    prevMove: {
                        face: face,
                        direction: boolRight
                    },
                    parent: parentNode,
                    children: []
                }
                const nodeLeft = {
                    depth: parentNode.depth + 1,
                    id: undefined,
                    state: stateTurnLeft,
                    prevMove: {
                        face: face,
                        direction: boolLeft
                    },
                    parent: parentNode,
                    children: []
                }
                //console.log(parentNode.depth)

                ////// OPTIMALIZATION 2: DON'T REPEAT ANY ANCESTORS IN STRAIGHT LINE

                // let checkDepth = parentNode.depth
                // while (checkDepth >= 0) {
                //     if (foundRight && foundLeft) break
                //     checkDepth--
                // }
                
                let foundRight = checkAbove(nodeRight.parent.parent, nodeRight)
                let foundLeft = checkAbove(nodeLeft.parent.parent, nodeLeft)

                if (foundRight == false) {
                    nodeRight.id = ++nodeId
                    parentNode.children.push(nodeRight)
                    queue.push(nodeRight)
                    nodeHistory.push(nodeRight)
                }
                if (foundLeft == false) {
                    nodeLeft.id = ++nodeId
                    parentNode.children.push(nodeLeft)
                    queue.push(nodeLeft)
                    nodeHistory.push(nodeLeft)
                } 
                
                function checkAbove(node, leaf) {
                    if (node.state == leaf.state) {
                        //console.log(leaf.depth-node.depth)
                        if ((leaf.depth - node.depth) > 2) {
                            //console.log(leaf.parent.children)
                        }
                        return true
                    } else if (node.depth > 0) {
                        checkAbove(node.parent, leaf)
                    } else if (node.depth == 0 && node.state != leaf.state) {
                        return false
                    } else if (node.depth == 0 && node.state == leaf.state) {
                        return true
                    }
                    return false
                }
                
                ////// OPTIMALIZATION 1: DON'T REPEAT GRANDPARENTS
                // if (nodeRight.state != parentNode.parent.state) {
                //     parentNode.children.push(nodeRight)
                //     queue.push(nodeRight)
                // } else { 
                //     nodeId-- // to be fixed
                // }
                // if (nodeLeft.state != parentNode.parent.state) {
                //     parentNode.children.push(nodeLeft)
                //     queue.push(nodeLeft)
                // } else { 
                //     nodeId-- // to be fixed
                // }
                
                ////// NO OPTIMALIZATION
                // parentNode.children.push(nodeRight, nodeLeft)
                // queue.push(nodeRight, nodeLeft)

                //////

                if (checkIfSolved(nodeLeft.state, this.patterns.whiteCross)) {
                    boundSolutionHandler(nodeLeft)
                    keepSearching = false
                    break
                } else if (checkIfSolved(nodeRight.state, this.patterns.whiteCross)) {
                    boundSolutionHandler(nodeRight)
                    keepSearching = false
                    break
                } 
            }
            queue.shift()
        }
        console.log(queue.length, "queue length")
        console.log(queue[queue.length - 1],"last in queue")
        console.log(root, "root")

        console.log(nodeHistory.length, "history length")

        // let testCube = cubeCopy.turn(new Turn(facesDefault[1], true)) 
        // let nextState = rotor(faceSouth, cubeCopy.state)

        function checkIfSolved(state, pattern) {
            for (let i = 0; i < state.length; i++) {
                if (state[i] !== pattern[i] && pattern[i] !== ".") {
                    return false
                }
            }
            return true
        }        
        function handleSolutionNode(solutionNode) {
            solutionNode.solved = true
            this.solution = solutionNode
            console.log("SOLVED")    
            console.log(solutionNode)
            debug(solutionNode.state)
            console.log((performance.now() - t0) / 1000 + " sec")
        }
        // ???
        // class handleSolutionNode {
        //     constructor(solutionNode) {
        //         solutionNode.solved = true
        //         this.solution = solutionNode
        //         console.log("SOLVED")
        //         debug(solutionNode.state)
        //     }
        // }
        // ???
        function checkAbove(node, leaf) {
            if (node.state == leaf.state) {
                return true
            } else if (node.depth > 0) {
                checkAbove(node.parent, leaf)
            } else if (node.depth == 0 && node.state != leaf.state) {
                return false
            }
        }
    }
}