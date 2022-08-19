
class SolutionFinder {
    constructor(cubeToSolve) {
        this.cubeToSolve = cubeToSolve
        this.stateToSolve = this.cubeToSolve.state 
        this.solution = {}
        this.solutionPath = []
        this.patterns = { // TEDIOUS
            solvedCubeContainer: {
                solvedCubePattern: "ooooooooowwwwwwwwwrrrrrrrrryyyyyyyyybbbbbbbbbggggggggg",
            },
            whiteWallSteps: {
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
            crossesGood: {
                //orangeCross: ".o.ooo.o....w...................y......b........g.....",
                orangeCross: ".o.ooo.o....ww........r........yy......bb.......gg....",
                whiteCross:  "....oo....w.www.w....rr........y........b..b..g..g....",
                redCross:    "....o........ww....r.rrr.r....yy........bb.......gg...",
                yellowCross: "...oo........w........rr....y.yyy.y..b..b........g..g.",
                blueCross:   ".o..o.....w..w.....r..r.....y..y.....b.bbb.b.....g....",
                greenCross:  "....o..o.....w..w.....r..r.....y..y.....b.....g.ggg.g.",
            },
            crossesRotated: {
            },
            faces: {
                orangeWall: "ooooooooow..w..w.............y..y..yb..b..b..g..g..g..",
                whiteWall:  "..o..o..owwwwwwwwwr..r..r.................bbbggg......",
                redWall:    "...........w..w..wrrrrrrrrry..y..y....b..b..b..g..g..g",
                yellowWall: "o..o..o.............r..r..ryyyyyyyyybbb............ggg",
                blueWall:   "ooo......www......rrr......yyy......bbbbbbbbb.........",
                greenWall:  "......ooo......www......rrr......yyy.........ggggggggg",
            },
            topCorners: {
                orangeCorners: "o.o.o.o.ow.....w.............y.....yb.....b..g.....g..",
                whiteCorners:  "..o.....ow.w.w.w.wr.....r.................b.bg.g......",
                redCorners:    "...........w.....wr.r.r.r.ry.....y....b.....b..g.....g",
                yellowCorners: "o.....o.............r.....ry.y.y.y.yb.b............g.g",
                blueCorners:   "o.o......w.w......r.r......y.y......b.b.b.b.b.........",
                greenCorners:  "......o.o......w.w......r.r......y.y.........g.g.g.g.g",
            },
            allCornersCont: {
                allCornersPatt: "o.o.o.o.ow.w.w.w.wr.r.r.r.ry.y.y.y.yb.b.b.b.bg.g.g.g.g",
            },
        }
        this.patterns.crossesRotated.orangeCross0 = this.patterns.crossesGood.orangeCross
        this.patterns.crossesRotated.orangeCross1 = rotor(facesDefault[0],this.patterns.crossesRotated.orangeCross0)
        this.patterns.crossesRotated.orangeCross2 = rotor(facesDefault[0],this.patterns.crossesRotated.orangeCross1)
        this.patterns.crossesRotated.orangeCross3 = rotor(facesDefault[0],this.patterns.crossesRotated.orangeCross2)

        this.patterns.crossesRotated.whiteCross0 = this.patterns.crossesGood.whiteCross
        this.patterns.crossesRotated.whiteCross1 = rotor(facesDefault[1],this.patterns.crossesRotated.whiteCross0)
        this.patterns.crossesRotated.whiteCross2 = rotor(facesDefault[1],this.patterns.crossesRotated.whiteCross1)
        this.patterns.crossesRotated.whiteCross3 = rotor(facesDefault[1],this.patterns.crossesRotated.whiteCross2)

        this.patterns.crossesRotated.redCross0 = this.patterns.crossesGood.redCross
        this.patterns.crossesRotated.redCross1 = rotor(facesDefault[2],this.patterns.crossesRotated.redCross0)
        this.patterns.crossesRotated.redCross2 = rotor(facesDefault[2],this.patterns.crossesRotated.redCross1)
        this.patterns.crossesRotated.redCross3 = rotor(facesDefault[2],this.patterns.crossesRotated.redCross2)

        this.patterns.crossesRotated.yellowCross0 = this.patterns.crossesGood.yellowCross
        this.patterns.crossesRotated.yellowCross1 = rotor(facesDefault[3],this.patterns.crossesRotated.yellowCross0)
        this.patterns.crossesRotated.yellowCross2 = rotor(facesDefault[3],this.patterns.crossesRotated.yellowCross1)
        this.patterns.crossesRotated.yellowCross3 = rotor(facesDefault[3],this.patterns.crossesRotated.yellowCross2)

        this.patterns.crossesRotated.blueCross0 = this.patterns.crossesGood.blueCross
        this.patterns.crossesRotated.blueCross1 = rotor(facesDefault[4],this.patterns.crossesRotated.blueCross0)
        this.patterns.crossesRotated.blueCross2 = rotor(facesDefault[4],this.patterns.crossesRotated.blueCross1)
        this.patterns.crossesRotated.blueCross3 = rotor(facesDefault[4],this.patterns.crossesRotated.blueCross2)

        this.patterns.crossesRotated.greenCross0 = this.patterns.crossesGood.greenCross
        this.patterns.crossesRotated.greenCross1 = rotor(facesDefault[5],this.patterns.crossesRotated.greenCross0)
        this.patterns.crossesRotated.greenCross2 = rotor(facesDefault[5],this.patterns.crossesRotated.greenCross1)
        this.patterns.crossesRotated.greenCross3 = rotor(facesDefault[5],this.patterns.crossesRotated.greenCross2)
    }
    scrambleAgain() {
        this.cubeToSolve.scramble()
        this.stateToSolve = this.cubeToSolve.state
    }
    debugPatterns() {
        // let cube = new Cube(this.patterns.crosses.yellowCross)
        // cube.log()
        // Object.keys(this.patterns.crosses).forEach(color => {
        //     let cube = new Cube(this.patterns.crosses[color])
        //     console.log(color + ":")
        //     cube.log()
        // })

        //this is good
        // Object.keys(this.patterns.crossesRotated).forEach(color => {
        //     let cube = new Cube(this.patterns.crossesRotated[color])
        //     console.log(color + ":")
        //     cube.log()
        // })

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

        // Object.keys(this.patterns.faces).forEach(color => {
        //     let cube = new Cube(this.patterns.faces[color])
        //     console.log(color + ":")
        //     cube.log()
        // })
        // Object.keys(this.patterns.topCorners).forEach(color => {
        //     let cube = new Cube(this.patterns.topCorners[color])
        //     console.log(color + ":")
        //     cube.log()
        // })
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

        let patternToFind = this.patterns.crossesRotated
        let crossesArr = []
        // for (const cross in this.patterns.crosses) crossesArr.push(this.patterns.crosses[cross])
        for (const cross in patternToFind) crossesArr.push(patternToFind[cross])

        while (queue.length > 0 && keepSearching) {
            
            const parentNode = queue[0]
            if (parentNode.depth >= 6 || queue.length > 800000) {
                keepSearching = false
                console.log((performance.now() - t0) / 1000 + " sec")
                console.log("break")
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

                ///////////////////////////////////////////////////////////////////////////
                ////// OPTIMALIZATION 3: DON'T REPEAT ANY NODE ////////////////////////////
                ////// note: very slow; takes about 15 sec to reach and complete level 5 deep
                ////// and about 0.5 sec to lvl 4

                // if (nodeHistory.indexOf(nodeLeft.state) === -1) {
                //     nodeLeft.id = ++nodeId
                //     parentNode.children.push(nodeLeft)
                //     queue.push(nodeLeft)
                //     nodeHistory.push(nodeLeft.state)
                //     allNodesArr.push(nodeLeft)
                // }
                // if (nodeHistory.indexOf(nodeRight.state) === -1) {
                //     nodeRight.id = ++nodeId
                //     parentNode.children.push(nodeRight)
                //     queue.push(nodeRight)
                //     nodeHistory.push(nodeRight.state)
                //     allNodesArr.push(nodeRight)
                // }

                //// testing combination of two different optimalizations
                // if (parentNode.depth < 1) {
                //     //
                //     if (nodeHistory.indexOf(nodeLeft.state) === -1) {
                //         nodeLeft.id = ++nodeId
                //         parentNode.children.push(nodeLeft)
                //         queue.push(nodeLeft)
                //         nodeHistory.push(nodeLeft.state)
                //         allNodesArr.push(nodeLeft)
                //     }
                //     if (nodeHistory.indexOf(nodeRight.state) === -1) {
                //         nodeRight.id = ++nodeId
                //         parentNode.children.push(nodeRight)
                //         queue.push(nodeRight)
                //         nodeHistory.push(nodeRight.state)
                //         allNodesArr.push(nodeRight)
                //     }
                //     //
                // } else if (parentNode.depth >= 1 && parentNode.depth <= 5) {
                //     let foundRight = lookForTwins(parentNode.parent, nodeRight.state)
                //     let foundLeft = lookForTwins(parentNode.parent, nodeLeft.state)

                //     if (foundRight == false) {
                //         nodeRight.id = ++nodeId
                //         parentNode.children.push(nodeRight)
                //         queue.push(nodeRight)
                //         //nodeHistory.push(nodeRight)
                //     }
                //     if (foundLeft == false) {
                //         nodeLeft.id = ++nodeId
                //         parentNode.children.push(nodeLeft)
                //         queue.push(nodeLeft)
                //         //nodeHistory.push(nodeLeft)
                //     } 

                //     function lookForTwins(a, b) {
                //         if (a.depth === -1) {
                //             return false
                //         } else if (a.state == b) {
                //             return true
                //         }
                //         return lookForTwins(a.parent, b)
                //     }
                // }


                ////// OPTIMALIZATION 2: DON'T REPEAT ANY ANCESTORS IN STRAIGHT LINE //////
                ////// note: not that bad

                let foundRight = lookForTwins(parentNode.parent, nodeRight.state)
                let foundLeft = lookForTwins(parentNode.parent, nodeLeft.state)

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

                if (boundCheckIfSolved(nodeLeft.state, crossesArr)) {
                    boundSolutionHandler(nodeLeft)
                    //debug(crossArr)
                    //console.log(crossesArr)
                    keepSearching = false
                    this.solution = nodeLeft
                    break
                } else if (boundCheckIfSolved(nodeRight.state, crossesArr)) {
                    boundSolutionHandler(nodeRight)
                    //debug(crossArr)
                    //console.log(crossesArr)
                    keepSearching = false
                    this.solution = nodeRight
                    break
                } 
            }
            queue.shift()
        }
        // console.log(queue.length, "queue length")
        // console.log(queue[queue.length - 1],"last in queue")
        // console.log(root, "root")

        // console.log(nodeHistory.length, "history length")
        // console.log(allNodesArr.sort((a,b) => {
        //     return a.children.length - b.children.length
        // }))

        function checkIfSolved(state, pattern) {
            let result = pattern.some(pat => {
                for (let i = 0; i < state.length; i++) {
                    if (state[i] !== pat[i] && pat[i] !== ".") {
                    return false
                    }
                }
                console.log("A PATTERN HAS BEEN FOUND:", Object.keys(patternToFind).find(key => patternToFind[key] === pat))
                //console.log(Object.keys(patternToFind).find(key => patternToFind[key] === pat))
                //debug(pat)
                return true
            })
            return result
        }        
        function handleSolutionNode(solutionNode) {
            solutionNode.solved = true
            this.solution = solutionNode
            //console.log("SOLVED (some pattern has been found)")    
            //console.log(solutionNode)
            //debug(solutionNode.state)
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

