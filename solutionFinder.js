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
                // 16: "5.o.oo..owwwwwwwwwr..rr.r....5.y....5...b.bbbggg.g....", // yellow corners trick: 5 - oby , 6 - bry, 7 - rgy, 8 - goy  
                16: "5.o.oo8.owwwwwwwwwr.6rr.r.76.5.y.7.85.6.b.bbbggg.g.8.7", // all yellow corners trick: 5 - oby , 6 - bry, 7 - rgy, 8 - goy  
                17: ".Vo.oo..owwwwwwwwwr..rr.r......y.......Vb.bbbggg.g....", // move middle pieces to the bottom
                18: ".Vo.oo..owwwwwwwwwrV.rr.r......y.......VbVbbbggg.g....", // move middle pieces to the bottom
                19: ".Vo.oo..owwwwwwwwwrV.rr.rV.....y.......VbVbbbggg.gV...", // move middle pieces to the bottom
                20: ".Vo.oo.VowwwwwwwwwrV.rr.rV.....y.......VbVbbbgggVgV...", // move middle pieces to the bottom
                21: ".oo.oo.VowwwwwwwwwrV.rr.rV.....y.......bbVbbbgggVgV...", // mid placer
                22: ".oo.oo.Vowwwwwwwwwrr.rr.rV.....y.......bbbbbbgggVgV...", // mid placer
                23: ".oo.oo.Vowwwwwwwwwrr.rr.rr.....y.......bbbbbbgggVgg...", // mid placer
                24: ".oo.oo.oowwwwwwwwwrr.rr.rr.....y.......bbbbbbgggggg...", // mid placer
                25: "5oo.oo8oowwwwwwwwwrr6rr.rr76.5.y.7.85.6bbbbbbgggggg8.7", // corners trick again
                26: "5oo*oo8oowwwwwwwwwrr6rr*rr76*5*y*7*85*6bbbbbbgggggg8*7", // bottom mids trick
                27: "5ooooo8oowwwwwwwwwrr6rrrrr76y5yyy7y85b6bbbbbbgggggg8g7", // just before fixing corners
                28: "ooo.ooooowwwwwwwwwrrrrr.rrry.y.y.y.yb.bbbbbbbggggggg.g", // yellow corners done (end)
                //99: "o.o.ooo.owwwwwwwwwr.rrr.r.ry.y.y.y.yb.b.b.bbbggg.g.g.g", // yellow corners done
                // 98: "o?ooooo$owwwwwwwwwr#rrrrr@ryyyyyyyyybbb?b#bbbggg$g@ggg", // mid remover
                30: "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg", // the end
            },
            tests: {
                midRemover: "o?ooooo$owwwwwwwwwr#rrrrr@ryyyyyyyyybbb?b#bbbggg$g@ggg", // mid remover
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
        this.currentPatternIdx = 0
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
        else if (what === "checkV") {
            console.log(this.patterns.algorithmSteps[23])
            debug("ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",true)
            debug("ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",false,true)
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
        if (this.currentPatternIdx === 12) {
            console.log("%ccorners spin sequence", "color: magenta")
            
            console.log("a sequence should work here")
        }
        if (this.currentPatternIdx > this.patterns.algorithmSteps.length) {
            return console.log("currentPatternIdx > steps.length")
        } 
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

        const relativesLeftArr = [faceWest, faceBottom, faceEast, faceTop]
        const relativesRightArr = [faceBottom, faceEast, faceTop, faceWest]

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

                const nodeRight = node(stateTurnRight, parentNode, {face: face, direction: true})
                const nodeLeft = node(stateTurnLeft, parentNode, {face: face, direction: false})

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
                }
            } else if (this.currentPatternIdx >= 12  && this.currentPatternIdx <= 15) {
                for (let i = 0; i < 4; i++) {                    
                    const relativeLeft = relativesLeftArr[i]
                    const relativeRight = relativesRightArr[i]
                    const relativeBottom = faceNorth // yellow

                    let state = queue[0].state
                    let stateSpinR = spinRight(relativeRight, relativeBottom, state)
                    let stateSpinL = spinLeft(relativeLeft, relativeBottom, state)

                    const nodeRight = node(stateSpinR, parentNode, {direction: true, cornerSpin: true, cornerNum: i})
                    const nodeLeft = node(stateSpinL, parentNode, {direction: false, cornerSpin: true, cornerNum: i})
                    
                    parentNode.children.push(nodeRight, nodeLeft)
                    queue.push(nodeRight, nodeLeft)

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
            } else if (this.currentPatternIdx === 16) {
                console.log("still going...")
                for (let i = 0; i < 4; i++) {
                    const relativeLeft = relativesLeftArr[i]
                    const relativeRight = relativesRightArr[i]
                    const relativeBottom = faceNorth // yellow

                    let state = queue[0].state
                    let magicSevenR = magicSevenRight(state, relativeRight, relativeBottom, relativeLeft)
                    let magicSevenL = magicSevenLeft(state, relativeRight, relativeBottom, relativeLeft)
                    let bottomRight = rotor(relativeBottom, state, indexes3x3, true)
                    let bottomLeft = rotor(relativeBottom, state, indexes3x3, false)


                    const nodeMagicRight = node(magicSevenR, parentNode, {direction: true, magicSeven: true, cornerNum: i})
                    const nodeMagicLeft = node(magicSevenL, parentNode, {direction: false, magicSeven: true, cornerNum: i})
                    const nodeBottomLeft = node(bottomLeft, parentNode, {direction: false, face: null}) // TO DO: FIX FACE FOR COMMAND PATTERN
                    const nodeBottomRight = node(bottomRight, parentNode, {direction: true, face: null}) // TO DO: FIX FACE FOR COMMAND PATTERN
                    
                    parentNode.children.push(nodeMagicLeft, nodeMagicRight, nodeBottomRight, nodeBottomLeft)
                    queue.push(nodeMagicLeft, nodeMagicRight, nodeBottomRight, nodeBottomLeft)
                    
                    if (boundCheckIfSolvedNew(parentNode.state)) {
                        console.log("parent")
                        boundSolutionHandler(parentNode)
                        break
                    } else if (boundCheckIfSolvedNew(nodeMagicLeft.state)) {
                        console.log("magic left")
                        boundSolutionHandler(nodeMagicLeft)
                        break
                    } else if (boundCheckIfSolvedNew(nodeMagicRight.state)) {
                        console.log("magic right")
                        boundSolutionHandler(nodeMagicRight)
                        break 
                    } else if (boundCheckIfSolvedNew(nodeBottomRight.state)) {
                        console.log("bottom right")
                        boundSolutionHandler(nodeBottomRight)
                        break 
                    } else if (boundCheckIfSolvedNew(nodeBottomLeft.state)) {
                        console.log("bottom left")
                        boundSolutionHandler(nodeBottomLeft)
                        break 
                    }
                }
            } else if (this.currentPatternIdx >= 17 && this.currentPatternIdx <= 24) {
                for (let i = 0; i < 4; i++) {
                    const relativeLeft = relativesLeftArr[i]
                    const relativeRight = relativesRightArr[i]
                    const relativeBottom = faceNorth // yellow
                    
                    let state = queue[0].state
                    let magicSevenR = magicSevenRight(state, relativeRight, relativeBottom, relativeLeft)
                        magicSevenR = magicSevenRight(magicSevenR, relativeRight, relativeBottom, relativeLeft)
                    let magicSevenL = magicSevenLeft(state, relativeRight, relativeBottom, relativeLeft)
                        magicSevenL = magicSevenLeft(magicSevenL, relativeRight, relativeBottom, relativeLeft)
                    let bottomRight = rotor(relativeBottom, state, indexes3x3, true)
                    let bottomLeft = rotor(relativeBottom, state, indexes3x3, false)

                    const nodeRight = node(magicSevenR, parentNode, {direction: true, magic27: true, cornerNum: i})
                    const nodeLeft = node(magicSevenL, parentNode, {direction: false, magic27: true, cornerNum: i})
                    const nodeBottomLeft = node(bottomLeft, parentNode, {direction: false, face: null}) // TO DO: FIX FACE FOR COMMAND PATTERN
                    const nodeBottomRight = node(bottomRight, parentNode, {direction: true, face: null}) // TO DO: FIX FACE FOR COMMAND PATTERN
                    
                    parentNode.children.push(nodeLeft, nodeRight, nodeBottomLeft, nodeBottomRight)
                    queue.push(nodeLeft, nodeRight, nodeBottomLeft, nodeBottomRight)

                    if (boundCheckIfSolvedNew(parentNode.state)) {
                        boundSolutionHandler(parentNode)
                        break
                    } else if (boundCheckIfSolvedNew(nodeLeft.state)) {
                        boundSolutionHandler(nodeLeft)
                        break
                    } else if (boundCheckIfSolvedNew(nodeRight.state)) {
                        boundSolutionHandler(nodeRight)
                        break 
                    } else if (boundCheckIfSolvedNew(nodeBottomLeft.state)) {
                        boundSolutionHandler(nodeBottomLeft)
                        break
                    } else if (boundCheckIfSolvedNew(nodeBottomRight.state)) {
                        boundSolutionHandler(nodeBottomRight)
                        break
                    }
                }
            } else if (this.currentPatternIdx === 25) {
                const relativeBottom = faceNorth

                let state = queue[0].state
                let stateTurnRight = rotor(relativeBottom, state, indexes3x3, true)
                let stateTurnLeft = rotor(relativeBottom, state, indexes3x3, false)
                
                const nodeRight = node(stateTurnRight, parentNode, {direction: true, face: relativeBottom})
                const nodeLeft = node(stateTurnLeft, parentNode, {direction: false, face: relativeBottom})
                
                parentNode.children.push(nodeLeft, nodeRight)
                queue.push(nodeLeft, nodeRight)
                
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
            } else if (this.currentPatternIdx === 26) {

            } else if (this.currentPatternIdx === 27) {
                console.log("empty")
                break
            } else if (this.currentPatternIdx === 28) { // yellow corners doer
                console.log("here")
                for (let i = 0; i < 4; i++) {
                    const relativeLeft = relativesLeftArr[i]
                    const relativeRight = relativesRightArr[i]
                    const relativeBottom = faceNorth // yellow

                    let state = queue[0].state
                    let magicSevenR = magicSevenRight(state, relativeRight, relativeBottom, relativeLeft)
                        magicSevenR = magicSevenRight(magicSevenR, relativeRight, relativeBottom, relativeLeft)
                        magicSevenR = magicSevenRight(magicSevenR, relativeRight, relativeBottom, relativeLeft)
                        magicSevenR = magicSevenRight(magicSevenR, relativeRight, relativeBottom, relativeLeft)
                    let magicSevenL = magicSevenLeft(state, relativeRight, relativeBottom, relativeLeft)
                        magicSevenL = magicSevenLeft(magicSevenL, relativeRight, relativeBottom, relativeLeft)
                        magicSevenL = magicSevenLeft(magicSevenL, relativeRight, relativeBottom, relativeLeft)
                        magicSevenL = magicSevenLeft(magicSevenL, relativeRight, relativeBottom, relativeLeft)

                    const nodeRight = node(magicSevenR, parentNode, {direction: true, magic47: true, cornerNum: i})
                    const nodeLeft = node(magicSevenL, parentNode, {direction: false, magic47: true, cornerNum: i})

                    parentNode.children.push(nodeLeft, nodeRight)
                    queue.push(nodeLeft, nodeRight)

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

