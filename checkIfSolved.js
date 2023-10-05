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
        if (pattern[i] !== "." && !pattern[i].match(/[12345678VX*]/) && state[i] !== pattern[i]) {
            result = false
            break
        }
        if (pattern[i] === "X" && state[i] === "w") {
            result = false
            break
        }
        if (pattern[i] === "V" && state[i].match(/[brgo]/)) {
            if (i === 1 && state[39].match(/[brgo]/) ||
                i === 39 && state[1].match(/[brgo]/) || 
                i === 41 && state[19].match(/[brgo]/) || 
                i === 19 && state[41].match(/[brgo]/) || 
                i === 25 && state[50].match(/[brgo]/) || 
                i === 50 && state[25].match(/[brgo]/) || 
                i === 48 && state[7].match(/[brgo]/) || 
                i === 7 && state[48].match(/[brgo]/)
            ){
                result = false
                break
            } 
        }
        if (pattern[i] === "*") {
            if (state[i].match(/[bg]/) && (i !== 37 && i !== 30 && i !== 52 && i !== 32)) {
                result = false
                break
            }
            if (state[i].match(/[or]/) && (i !== 3 && i !== 23 && i !== 28 && i !== 34)) {
                result = false
                break
            }
        }
        if (pattern[i] == "1" && !state[i].match(/[wbo]/)) {
            result = false
            break
        }
        if (pattern[i] == "2" && !state[i].match(/[wrb]/)) {
            result = false
            break
        }
        if (pattern[i] == "3" && !state[i].match(/[wgr]/)) {
            result = false
            break
        }
        if (pattern[i] == "4" && !state[i].match(/[wgo]/)) {
            result = false
            break
        }
        if (pattern[i] == "5" && !state[i].match(/[oby]/)) {
            result = false
            break
        }
        if (pattern[i] == "6" && !state[i].match(/[bry]/)) {
            result = false
            break
        }
        if (pattern[i] == "7" && !state[i].match(/[rgy]/)) {
            result = false
            break
        }
        if (pattern[i] == "8" && !state[i].match(/[goy]/)) {
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