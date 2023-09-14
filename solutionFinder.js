console.log("SolutionFinder loaded")

class SolutionFinder {
    constructor(cubeToSolve) {
        this.cubeToSolve = cubeToSolve
        this.stateToSolve = this.cubeToSolve.state 
        this.solutionLeaves = []
        this.solutionPath = []
        this.currentPatternIdx = 0
        this.finderIteration = 0
        this.keepIterator = true
        this.numberOfFails = 0
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
                10: "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",
            },
            yellowCorners: {
                0:  "o.o.ooo.owwwwwwwwwr.rrr.r.ry.y.y.y.yb.b.b.bbbggg.g.g.g",
            },
            solvedCubePattern: {
                0: "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",
            },
            tests: {
                default: "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",
                westCount: "ooooooooogwwgwwgwwrrrrrrrrryybyybyybwbbwbbwbbyggyggygg",
                westClock: "ooooooooobwwbwwbwwrrrrrrrrryygyygyygybbybbybbwggwggwgg",
                west180: "oooooooooywwywwywwrrrrrrrrryywyywyywgbbgbbgbbbggbggbgg",
                southCount: "oobooboobwwwwwwwwwgrrgrrgrryyyyyyyyybbbbbbrrrooogggggg",
                southClock: "oogoogoogwwwwwwwwwbrrbrrbrryyyyyyyyybbbbbbooorrrgggggg",
                south180: "oorooroorwwwwwwwwworrorrorryyyyyyyyybbbbbbgggbbbgggggg",
                eastCount: "ooooooooowwbwwbwwbrrrrrrrrrgyygyygyybbybbybbyggwggwggw",
                eastClock: "ooooooooowwgwwgwwgrrrrrrrrrbyybyybyybbwbbwbbwggyggyggy",
                east180: "ooooooooowwywwywwyrrrrrrrrrwyywyywyybbgbbgbbgggbggbggb",
                northCount: "googoogoowwwwwwwwwrrbrrbrrbyyyyyyyyyooobbbbbbggggggrrr",
                northClock: "boobooboowwwwwwwwwrrgrrgrrgyyyyyyyyyrrrbbbbbbggggggooo",
                north180: "roorooroowwwwwwwwwrrorrorroyyyyyyyyygggbbbbbbggggggbbb",
                topCount: "yyyooooooooowwwwwwwwwrrrrrrrrryyyyyybbbbbbbbbggggggggg",
                topClock: "wwwoooooorrrwwwwwwyyyrrrrrroooyyyyyybbbbbbbbbggggggggg",
                top180: "rrrooooooyyywwwwwwooorrrrrrwwwyyyyyybbbbbbbbbggggggggg",
                bottomCount: "oooooowwwwwwwwwrrrrrrrrryyyyyyyyyooobbbbbbbbbggggggggg",
                bottomClock: "ooooooyyywwwwwwooorrrrrrwwwyyyyyyrrrbbbbbbbbbggggggggg",
                bottom180: "oooooorrrwwwwwwyyyrrrrrroooyyyyyywwwbbbbbbbbbggggggggg",
            }
        }
    }

    scrambleAgain() {
        this.cubeToSolve.instaSolve()
        this.cubeToSolve.scramble()
        this.stateToSolve = this.cubeToSolve.state
    }

    debugPatterns(what) {
        if (what == "tests") {
            Object.keys(this.patterns.tests).forEach(side => {
                let cube = new Cube(this.patterns.tests[side])
                console.log(side + ":")
                cube.log()
            })
        } else {
            Object.keys(this.patterns.algorithmSteps).forEach(side => {
                let cube = new Cube(this.patterns.algorithmSteps[side])
                console.log(side + ":")
                cube.log()
            })
            Object.keys(this.patterns.yellowCorners).forEach(side => {
                let cube = new Cube(this.patterns.yellowCorners[side])
                console.log(side + ":")
                cube.log()
            })
        }
    }

    findAnyWall() {
        if (this.cubeToSolve.state != this.stateToSolve) {
            this.stateToSolve = this.cubeToSolve.state
        }
        console.log("wall")
    }

    createPath() {
        console.log(this.solutionLeaves)
        const len = this.solutionLeaves.length
        let tempArr = []
        for (let i = len - 1; i >= 0; i--) {
            let tempNode = this.solutionLeaves[i]
            console.log(i)
            console.log(tempNode)
            while (tempNode.depth > 0) {
                tempArr.unshift(tempNode.prevMove)
                tempNode = tempNode.parent
            }
        }
        console.log(tempArr)
        this.solutionPath = tempArr
    }

    updateCube() {
        this.sIterator()
        this.createPath()

        const solverLastState = this.stateToSolve

        for (let elem of this.solutionPath) {
            console.log(elem)
            let turn = new Turn(elem.face, elem.direction, elem.double)
            console.log(turn)
            this.cubeToSolve.turn(turn)
        }

        debug(solverLastState)
        debug(this.cubeToSolve.state)

        this.solutionPath.forEach(() => this.cubeToSolve.undo())
    }

    iterTest(x) {
        let t0 = performance.now()
        this.numberOfFails = 0
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
        console.log(`Test ended with ${this.numberOfFails} fails in ${(performance.now()-t0)/1000} seconds`)
    }

    sIterator() {
        let t0 = performance.now()
        while(this.finderIteration < 4 && this.keepIterator) {
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
                direction: null,
                double: null
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
            if (parentNode.depth >= 5 || queue.length > 2560000) {
                keepSearching = false
                console.log((performance.now() - t0) / 1000 + " sec")
                console.log("break")
                console.log(queue[queue.length - 1])
                this.keepIterator = false
                this.numberOfFails++
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
                //console.log(faces)
                let face = faces[i]
                let boolRight = true
                let boolLeft = false
                let flag180 = "180"
                let state = queue[0].state
                let stateTurnRight = rotor(face, state, indexes3x3, boolRight)
                let stateTurnLeft = rotor(face, state, indexes3x3, boolLeft)
                let stateTurn180 = rotor(face, state, indexes3x3, boolRight, true)
                
                const nodeRight = {
                    depth: parentNode.depth + 1,
                    id: undefined,
                    state: stateTurnRight,
                    prevMove: {
                        face: face,
                        direction: boolRight,
                        double: false
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
                        direction: boolLeft,
                        double: false
                    },
                    parent: parentNode,
                    children: []
                }

                const node180 = {
                    depth: parentNode.depth + 1,
                    id: undefined,
                    state: stateTurn180,
                    prevMove: {
                        face: face,
                        direction: flag180,
                        double: true
                    },
                    parent: parentNode,
                    children: []
                }

                ////// OPTIMALIZATION 2: DON'T REPEAT ANY ANCESTORS IN STRAIGHT LINE //////
                ////// note: not that bad

                // let foundRight = lookForTwins(parentNode.parent, nodeRight.state)
                // let foundLeft = lookForTwins(parentNode.parent, nodeLeft.state)
                // let found180 = lookForTwins(parentNode.parent, node180.state)

                // if (foundRight == false) {
                //     nodeRight.id = ++nodeId
                //     parentNode.children.push(nodeRight)
                //     queue.push(nodeRight)
                //     nodeHistory.push(nodeRight)
                // }
                // if (foundLeft == false) {
                //     nodeLeft.id = ++nodeId
                //     parentNode.children.push(nodeLeft)
                //     queue.push(nodeLeft)
                //     nodeHistory.push(nodeLeft)
                // } 
                // if (found180 == false) {
                //     node180.id = ++nodeId
                //     parentNode.children.push(nodeLeft)
                //     queue.push(node180)
                //     nodeHistory.push(node180)
                // } 

                // function lookForTwins(a, b) {
                //     if (a.depth === -1) {
                //         return false
                //     } else if (a.state == b) {
                //         return true
                //     }
                //     return lookForTwins(a.parent, b)
                // }
                
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

                parentNode.children.push(nodeRight, nodeLeft, node180)
                queue.push(nodeRight, nodeLeft, node180)

                ///////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////

                if (boundCheckIfSolved(nodeLeft.state, patternsArr)) {
                    boundSolutionHandler(nodeLeft)
                    break
                } else if (boundCheckIfSolved(nodeRight.state, patternsArr)) {
                    boundSolutionHandler(nodeRight)
                    break 
                } else if (boundCheckIfSolved(node180.state, patternsArr)) {
                    boundSolutionHandler(node180)
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
                if (pattern.indexOf(pat) >= this.currentPatternIdx) {
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
            this.solutionLeaves.push(solutionNode)
            keepSearching = false
            this.stateToSolve = solutionNode.state
            console.log(solutionNode)

            //console.log("SOLVED (some pattern has been found)")    
            //console.log(solutionNode)
            //debug(solutionNode.state)
            console.log("Found in: " + (performance.now() - t0) / 1000 + " sec")
        }
    }
}

