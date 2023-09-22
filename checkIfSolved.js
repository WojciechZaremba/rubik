function checkIfSolved(state, patterns, whiteCornersRemover = false) {
    if (whiteCornersRemover) {
        
    } else {
        let result = patterns.some(currentPattern => {
            // debug(currentPattern)
            for (let i = 0; i < state.length; i++) {
                if (state[i] !== currentPattern[i] && currentPattern[i] !== ".") {
                return false
                }
            }
            if (patterns.indexOf(currentPattern) === this.currentPatternIdx + 1 || patterns.indexOf(currentPattern) === this.currentPatternIdx) {
                console.log(this.currentPatternIdx)
                this.currentPatternIdx = patterns.indexOf(currentPattern) + 1
                // just use indexOf lmao
                console.log("FOUND PATTERN NUMBER", Object.keys(patternToFind).find(key => patternToFind[key] === currentPattern))
                debug(currentPattern)
                console.log("Current cube state:")
                debug(state)
                return true
            } else {
                return false
            }
        })
        return result
    }
} 

function checkIfSolvedNew(state) {
    let result = true
    // console.log(this.currentPatternIdx)
    const idx = this.currentPatternIdx
    const pattern = this.patterns.algorithmSteps[idx]
    // const pattern = this.patterns.tests.stressTest

    
    for (let i = 0; i < state.length; i++) {
        if (pattern[i] !== "." && pattern[i] !== "X" && !pattern[i].match(/[1234]/) && state[i] !== pattern[i]) {
            result = false
            break
        }
        if (pattern[i] === "X" && state[i] === "w") {
            result = false
            break
        }
        if (pattern[i] == "1" && !state[i].match(/[wbo]/)) {
            result = false
            break
        }
        // if (pattern[i] == "1" && state[i] !== "w" && state[i] !== "b" && state[i] !== "o") {
        //     console.log(pattern[i])
        //     result = false
        //     break
        // }
        if (pattern[i] === "2" && state[i] !== "w" && state[i] !== "r" && state[i] !== "b") {
            result = false
            break
        }
        if (pattern[i] === "3" && state[i] !== "w" && state[i] !== "g" && state[i] !== "r") {
            result = false
            break
        }
        if (pattern[i] === "4" && state[i] !== "w" && state[i] !== "g" && state[i] !== "o") {
            result = false
            break
        }
    }
    if (result) {
        console.log("FOUND PATTERN NUMBER", idx)
        debug(pattern)
        console.log("Current cube state:")
        debug(state)
        this.currentPatternIdx += 1
    }
    
    return result
}     