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
        this.patterns = {
            algorithmSteps: {
                0:  "....o.....w..w........r........y........b..b.....g....",
                1:  "....o.....w..ww......rr........y........b..b.....g....",
                2:  "....o.....w..ww.w....rr........y........b..b..g..g....",
                3:  "....oo....w.www.w....rr........y........b..b..g..g....", // white cross
                4:  "..X.oo...Xw.www.w....rr........y........b.Xb..g..g....", 
                5:  "..X.oo...XwXwww.w.X..rr........y........b.XbX.g..g....", 
                6:  "..X.oo...XwXwww.wXX..rr.X......y........b.XbX.gX.g....", 
                7:  "..X.oo..XXwXwwwXwXX..rr.X......y........b.XbXXgX.g....", // remove any white pieces from X
                8:  "..1.oo...1w.www.w....rr........y........b.1b..g..g....", 
                9:  "..1.oo...1w2www.w.2..rr........y........b.1b2.g..g....", 
                10: "..1.oo...1w2www.w32..rr.3......y........b.1b2.g3.g....", 
                11: "..1.oo..41w2www4w32..rr.3......y........b.1b24g3.g....", // white corner tricks: 1 - wbo, 2 - wbr, 3 - wgr, 4 - wgo
                12: "....oo....wwwww.w.r..rr........y........b..bb.g..g....",
                13: "....oo....wwwww.wwr..rr.r......y........b..bb.gg.g....",
                14: "....oo..o.wwwwwwwwr..rr.r......y........b..bbggg.g....",
                15: "..o.oo..owwwwwwwwwr..rr.r......y........b.bbbggg.g....", // complete white wall
                16: "5.o.oo8.owwwwwwwwwr.6rr.r.76.5.y.7.85.6.b.bbbggg.g.8.7", // yellow corners trick: 5 - oby , 6 - bry, 7 - rgy, 8 - goy  
                17: "o.o.ooo.owwwwwwwwwr.rrr.r.ry.y.y.y.yb.b.b.bbbggg.g.g.g", // yellow corners
                18: "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",
            },
            // algorithmSteps: {
            //     0:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",
            //     1:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",
            //     2:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",
            //     3:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg", // white cross
            //     4:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg", 
            //     5:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg", 
            //     6:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg", 
            //     7:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg", // remove any white pieces from X
            //     8:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",
            //     9:  "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",
            //     10: "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",
            //     11: "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg", // complete white wall
            //     12: "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",// yellow corners
            //     13: "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg"
            // },
            tests: {
                stressTest: "this will not be found rrrryyyyyyyyybbbbbbbbbggggggggg",
                default:    "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",
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
        } else if (what === "remover") {
            let cube = new Cube(this.patterns.algorithmSteps[4])
            cube.log()
            let cube1 = new Cube(this.patterns.algorithmSteps[5])
            cube1.log()
            let cube2 = new Cube(this.patterns.algorithmSteps[6])
            cube2.log()
            let cube3 = new Cube(this.patterns.algorithmSteps[7])
            cube3.log()
        } 
        else {
            Object.keys(this.patterns.algorithmSteps).forEach(side => {
                let cube = new Cube(this.patterns.algorithmSteps[side])
                console.log(side + ":")
                cube.log()
            })
            // Object.keys(this.patterns.yellowCorners).forEach(side => {
            //     let cube = new Cube(this.patterns.yellowCorners[side])
            //     console.log(side + ":")
            //     cube.log()
            // })
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
        //this.sIterator()
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
        if (this.currentPatternIdx === 12){
            console.log("%ccorners spin sequence", "color: magenta")
            
            console.log("a sequence should work here")
        }
        if (this.currentPatternIdx > 17) return console.log("currentPatternIdx > 17")
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
        const boundCheckIfSolvedNew = checkIfSolvedNew.bind(this)

        let patternToFind = this.patterns.algorithmSteps
        let patternsArr = []
        // for (const cross in this.patterns.crosses) patternsArr.push(this.patterns.crosses[cross])
        for (const cross in patternToFind) patternsArr.push(patternToFind[cross])

        while (queue.length > 0 && keepSearching) {
            
            const parentNode = queue[0]
            if (parentNode.depth >= 5) {
            // if (parentNode.depth > 4 || queue.length > 2048000) {
                keepSearching = false
                console.log((performance.now() - t0) / 1000 + " sec")
                console.log("break")
                console.log(queue[queue.length - 1])
                console.log(queue.length)
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

            if (this.currentPatternIdx < 12) {
                for (let i = 0; i < faces.length; i++) {
                //console.log(faces)
                let face = faces[i]
                let boolRight = true
                let boolLeft = false
                //let flag180 = "180"
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
                

                // const node180 = {
                //     depth: parentNode.depth + 1,
                //     id: undefined,
                //     state: stateTurn180,
                //     prevMove: {
                //         face: face,
                //         direction: flag180,
                //         double: true
                //     },
                //     parent: parentNode,
                //     children: []
                // }

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
                //     // nodeRight.id = ++nodeId
                //     queue.push(nodeRight)
                // }
                // if (nodeLeft.state != parentNode.parent.state) {
                //     parentNode.children.push(nodeLeft)
                //     nodeLeft.id = ++nodeId
                //     queue.push(nodeLeft)
                // }
                
                ////// NO OPTIMALIZATION //////////////////////////////////////////////////
                ////// note: takes about 0.2 sec to reach and complete level 5 deep

                parentNode.children.push(nodeRight, nodeLeft)
                queue.push(nodeRight, nodeLeft)
                // parentNode.children.push(nodeRight, nodeLeft, node180)
                // queue.push(nodeRight, nodeLeft, node180)

                ///////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////

                // boundCheckIfSolvedNew(nodeLeft.state)


                if (boundCheckIfSolvedNew(parentNode.state)) {
                    boundSolutionHandler(parentNode)
                    break
                } else if (boundCheckIfSolvedNew(nodeLeft.state)) {
                    boundSolutionHandler(nodeLeft)
                    break
                } else if (boundCheckIfSolvedNew(nodeRight.state)) {
                    boundSolutionHandler(nodeRight)
                    break 
                } 
                // else if (boundCheckIfSolvedNew(node180.state)) {
                //     boundSolutionHandler(node180)
                //     break
                // } 
                
                // if (boundCheckIfSolved(nodeLeft.state, patternsArr)) {
                //     boundSolutionHandler(nodeLeft)
                //     break
                // } else if (boundCheckIfSolved(nodeRight.state, patternsArr)) {
                //     boundSolutionHandler(nodeRight)
                //     break 
                // } else if (boundCheckIfSolved(node180.state, patternsArr)) {
                //     boundSolutionHandler(node180)
                //     break
                // } 
                }
            } else if (this.currentPatternIdx >= 12  && this.currentPatternIdx <= 15) {
                for (let i = 0; i < 4; i++) {
                    let sequenceLeft = null
                    let sequenceRight = null
                    const sequenceBottom = faceNorth // yellow
                    switch (i) {
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

                    let state = queue[0].state

                    let stateRCS = rotor(sequenceRight, state, indexes3x3, false)
                        stateRCS = rotor(sequenceBottom, stateRCS, indexes3x3, true)
                        stateRCS = rotor(sequenceRight, stateRCS, indexes3x3, true)
                        stateRCS = rotor(sequenceBottom, stateRCS, indexes3x3, false)
                        stateRCS = rotor(sequenceRight, stateRCS, indexes3x3, false)
                        stateRCS = rotor(sequenceBottom, stateRCS, indexes3x3, true)
                        stateRCS = rotor(sequenceRight, stateRCS, indexes3x3, true)

                    let stateTurnLeft = rotor(sequenceLeft, state, indexes3x3, true)
                        stateTurnLeft = rotor(sequenceBottom, stateTurnLeft, indexes3x3, false)
                        stateTurnLeft = rotor(sequenceLeft, stateTurnLeft, indexes3x3, false)
                        stateTurnLeft = rotor(sequenceBottom, stateTurnLeft, indexes3x3, true)
                        stateTurnLeft = rotor(sequenceLeft, stateTurnLeft, indexes3x3, true)
                        stateTurnLeft = rotor(sequenceBottom, stateTurnLeft, indexes3x3, false)
                        stateTurnLeft = rotor(sequenceLeft, stateTurnLeft, indexes3x3, false)

                    const nodeRight = {
                        depth: parentNode.depth + 1,
                        id: undefined,
                        state: stateRCS  ,
                        prevMove: {
                            face: null,
                            direction: true,
                            double: false,
                            cornerSpin: true,
                            cornerNum: i,
                        },  
                        parent: parentNode,
                        children: []
                    }

                    const nodeLeft = {
                        depth: parentNode.depth + 1,
                        id: undefined,
                        state: stateTurnLeft,
                        prevMove: {
                            face: null,
                            direction: false,
                            double: false,
                            cornerSpin: true,
                            cornerNum: i,
                        },
                        parent: parentNode,
                        children: []
                    }

                    if (boundCheckIfSolvedNew(parentNode.state)) {
                        boundSolutionHandler(parentNode)
                        break
                    } else if (boundCheckIfSolvedNew(nodeLeft.state)) {
                        boundSolutionHandler(nodeLeft)
                        break
                    } else if (boundCheckIfSolvedNew(nodeRight.state)) {
                        boundSolutionHandler(nodeRight)
                        break 
                    }
                }
            } else if (this.currentPatternIdx > 15) {

            }

            
            queue.shift()
        }

        // console.log(queue.length, "queue length")
        // console.log(queue[queue.length - 1],"last in queue")
        // console.log(root, "root")
        // console.log(nodeHistory.length, "history length")

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

