console.log("SolutionFinder loaded")

class SolutionFinder {
    constructor(cubeToSolve) {
        this.cubeToSolve = cubeToSolve
        this.stateToSolve = this.cubeToSolve.state
        this.solution = {}
        this.solutionPath = []
        this.currentPatternIdx = 0
        this.finderIteration = 0
        this.keepIterator = true
        this.patterns = { // TEDIOUS
            algorithmSteps: {
                0:  "....o.....w..w........r........y........b..b.....g....",
                1:  "....o.....w..ww......rr........y........b..b.....g....",
                2:  "....o.....w..ww.w....rr........y........b..b..g..g....",
                3:  "....oo....w.www.w....rr........y........b..b..g..g....",
                4:  "....oo....wwwww.w.r..rr........y........b..bb.g..g....",
                5:  "....oo....wwwww.wwr..rr.r......y........b..bb.gg.g....",
                6:  "....oo..o.wwwwwwwwr..rr.r......y........b..bbggg.g....",
                7:  "..o.oo..owwwwwwwwwr..rr.r......y........b.bbbggg.g....",
            },
            yellowCorners: {
                0:  "o.o.ooo.owwwwwwwwwr.rrr.r.ry.y.y.y.yb.b.b.bbbggg.g.g.g",
            },
            solvedCubePattern: {
                0: "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",
            },
        }
    }

    scrambleAgain() {
        this.cubeToSolve.instaSolve()
        this.cubeToSolve.scramble()
        this.stateToSolve = this.cubeToSolve.state
    }

    debugPatterns() {
        Object.keys(this.patterns.whiteWallSteps).forEach(color => {
            let cube = new Cube(this.patterns.whiteWallSteps[color])
            console.log(color + ":")
            cube.log()
        })
        Object.keys(this.patterns.yellowCorners).forEach(color => {
            let cube = new Cube(this.patterns.yellowCorners[color])
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

    iterTest(x) {
        while(x > 0) {
            console.log(`%c========================== tests left ${x} ==========================`, 'color: red')
            // this.cubeToSolve.scrambe()
            // this.stateToSolve = this.cubeToSolve.state
            this.currentPatternIdx = 0
            this.finderIteration = 0
            this.keepIterator = true
            this.scrambleAgain()
            this.sIterator()
            x--
        }
    }

    sIterator() {
        let t0 = performance.now()
        while(this.finderIteration < 3 && this.keepIterator) {
            console.log(`%c//////////// ITERATION ${this.finderIteration} ////////////`, 'color: #bada55')
            this.search()
            this.finderIteration++
        }
        console.log((performance.now()-t0)/1000)
    }

    search() {
        if (this.currentPatternIdx > 4) return console.log("currentPatternIdx > 4")
        let t0 = performance.now()
        console.log(`Searching for pattern number ${this.currentPatternIdx}`)
        //if (this.cubeToSolve.state != this.stateToSolve) this.stateToSolve = this.cubeToSolve.state

        const root = {
            depth: 0,
            id: 0,
            state: this.stateToSolve,
            prevMove: {
                face: null,
                direction: null
            },
            parent: {
                depth: -1,
                state: undefined
            },
            children: []
        }
        
        const faces = indexes3x3.facesDefault
        
        const nodeHistory = [root.state]
        const allNodesArr = [root]

        const queue = [root]
        let keepSearching = true
        let nodeId = 0
        
        const boundSolutionHandler = handleSolutionNode.bind(this)
        const boundCheckIfSolved = checkIfSolved.bind(this)

        let patternToFind = this.patterns.algorithmSteps
        let patternsArr = []
        // for (const cross in this.patterns.crosses) patternsArr.push(this.patterns.crosses[cross])
        for (const cross in patternToFind) patternsArr.push(patternToFind[cross])

        while (queue.length > 0 && keepSearching) {
            
            const parentNode = queue[0]
            if (parentNode.depth >= 6 || queue.length > 320000) {
                keepSearching = false
                console.log((performance.now() - t0) / 1000 + " sec")
                console.log("break")
                this.keepIterator = false
                break
            } 

            // if (checkIfSolved(queue[0].state, pattern)) {
            //     this.solution = queue[0]
            //     console.log("a solution has been found")
            //     this.solution = queue[0]
            //     keepSearching = false
            //     break
            // }

            for (let i = 0; i < faces.length; i++) {
                let face = faces[i]
                let boolRight = true
                let boolLeft = false
                let flag180 = "180"
                let state = queue[0].state
                let stateTurnRight = rotor(face, state, indexes3x3, boolRight)
                let stateTurnLeft = rotor(face, state, indexes3x3, boolLeft)
                //let stateTurn180 = rotor(face, state, indexes3x3, boolRight, true)
                
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

                // const node180 = {
                //     depth: parentNode.depth + 1,
                //     id: undefined,
                //     state: stateTurn180,
                //     prevMove: {
                //         face: face,
                //         direction: flag180
                //     },
                //     parent: parentNode,
                //     children: []
                // }

                ////// OPTIMALIZATION 2: DON'T REPEAT ANY ANCESTORS IN STRAIGHT LINE //////
                ////// note: not that bad

                let foundRight = lookForTwins(parentNode.parent, nodeRight.state)
                let foundLeft = lookForTwins(parentNode.parent, nodeLeft.state)
                // let found180 = lookForTwins(parentNode.parent, node180.state)

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
                // if (found180 == false) {
                //     node180.id = ++nodeId
                //     parentNode.children.push(nodeLeft)
                //     queue.push(node180)
                //     nodeHistory.push(node180)
                // } 

                function lookForTwins(a, b) {
                    if (a.depth === -1) {
                        return false
                    } else if (a.state == b) {
                        return true
                    }
                    return lookForTwins(a.parent, b)
                }
                
                ////// OPTIMALIZATION 1: DON'T REPEAT GRANDPARENTS ////////////////////////
                ////// note: takes about 0.2 sec to reach and complete level 5 deep

                // if (nodeRight.state != parentNode.parent.state) {
                //     parentNode.children.push(nodeRight)
                //     nodeRight.id = ++nodeId
                //     queue.push(nodeRight)
                // }
                // if (nodeLeft.state != parentNode.parent.state) {
                //     parentNode.children.push(nodeLeft)
                //     nodeLeft.id = ++nodeId
                //     queue.push(nodeLeft)
                // }
                
                ////// NO OPTIMALIZATION //////////////////////////////////////////////////
                ////// note: takes about 0.2 sec to reach and complete level 5 deep

                // parentNode.children.push(nodeRight, nodeLeft)
                // queue.push(nodeRight, nodeLeft)

                ///////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////

                if (boundCheckIfSolved(nodeLeft.state, patternsArr)) {
                    boundSolutionHandler(nodeLeft)
                    // debug(crossArr)
                    //console.log(patternsArr)
                    keepSearching = false
                    this.solution = nodeLeft
                    this.stateToSolve = nodeLeft.state
                    break
                } else if (boundCheckIfSolved(nodeRight.state, patternsArr)) {
                    boundSolutionHandler(nodeRight)
                    //debug(crossArr)
                    //console.log(patternsArr)
                    keepSearching = false
                    this.solution = nodeRight
                    this.stateToSolve = nodeRight.state
                    break
                } 
            }
            queue.shift()
        }

        // console.log(queue.length, "queue length")
        // console.log(queue[queue.length - 1],"last in queue")
        // console.log(root, "root")
        // console.log(nodeHistory.length, "history length")

        function checkIfSolved(state, pattern) {
            let result = pattern.some(pat => {
                for (let i = 0; i < state.length; i++) {
                    if (state[i] !== pat[i] && pat[i] !== ".") {
                    return false
                    }
                }
                if (pattern.indexOf(pat) > this.currentPatternIdx) {
                    this.currentPatternIdx = pattern.indexOf(pat) + 1
                    // just use indexOf lmao
                    console.log("FOUND PATTERN NUMBER", Object.keys(patternToFind).find(key => patternToFind[key] === pat))
                    debug(pat)
                    console.log("Current cube state:")
                    debug(state)
                    return true
                } else {
                    return false
                }
            })
            return result
        }     

        function handleSolutionNode(solutionNode) {
            solutionNode.solved = true
            this.solution = solutionNode
            //console.log("SOLVED (some pattern has been found)")    
            //console.log(solutionNode)
            //debug(solutionNode.state)
            console.log("Found in: " + (performance.now() - t0) / 1000 + " sec")
        }
        
    }
}

