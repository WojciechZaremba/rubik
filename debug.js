console.log("debug loaded")

function debug(cubeState) {
    const logsParts      = ["", "", ""] // = ["TOP","SIDES","BOTTOM"]
    const logsStyles = [[], [], []]

    let logsReady = ""
    
    for (let i = 36; i < 45; i += 3) { // blue wall (TOP)
        logsParts[0] += `        ${cubeState.substring(i, i + 3)}\n` // a few spaces on the left
    }
    for (let i = 0; i < 3; i++) { // orange, white, red and yellow walls (SIDES)
        for (let j = i * 3; j < 36; j += 9) {
            logsParts[1] += ` ${cubeState.substring(j, j + 3)}`
        }
        logsParts[1] += "\n"
    }
    for (let i = 45; i < 54; i += 3) { // green wall (BOTTOM)
        logsParts[2] += `\n        ${cubeState.substring(i, i + 3)}` // again a few spaces on the left
    }

    logsParts[1] = logsParts[1].substring(0,logsParts[1].length - 1) // removes redundant last "/n"

    for (let l = 0; l < logsParts.length; l++) {
        let temp = logsParts[l].split("") // should it work with just a string?
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].match(/[owrybgX.1234]/)) { // avoid escape characters so you don't syle them
                switch (temp[i]) {
                    case "o":
                        logsStyles[l].push("color: orange")
                    break
                    case "w":
                        logsStyles[l].push("color: gainsboro")
                    break
                    case "r":
                        logsStyles[l].push("color: tomato")
                    break
                    case "y":
                        logsStyles[l].push("color: gold")
                    break
                    case "b":
                            logsStyles[l].push("color: cyan")
                    break
                    case "g":
                        logsStyles[l].push("color: seagreen")
                    break
                    case "X":
                        logsStyles[l].push("color: black")
                    break
                    case "1":
                        logsStyles[l].push("color: magenta")
                    break
                    case "2":
                        logsStyles[l].push("color: magenta")
                    break
                    case "3":
                        logsStyles[l].push("color: magenta")
                    break
                    case "4":
                        logsStyles[l].push("color: magenta")
                    break
                    case ".":
                        logsStyles[l].push("color: grey")
                        break
                }
                temp[i] = " %c" + temp[i]
                
            }
        }
        logsParts[l] = temp.join("")
        logsReady += logsParts[l]
        
    }
    // console.log(logsParts)
    // console.log(logsReady)
    // console.log(logsStyles)
    console.log(logsReady, ...logsStyles.flat())
}