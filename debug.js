function debug(cubeState) {
    const logs      = ["", "", ""]
    const logStyles = [[], [], []]

    let logsReady = ""
    
    for (let i = 36; i < 45; i += 3) {
        logs[0] += `        ${cubeState.substring(i, i + 3)}\n`
    }
    for (let i = 0; i < 3; i++) {
        for (let j = i * 3; j < 36; j += 9) {
            logs[1] += ` ${cubeState.substring(j, j + 3)}`
        }
        logs[1] += "\n"
    }
    for (let i = 45; i < 54; i += 3) {
        logs[2] += `\n        ${cubeState.substring(i, i + 3)}`
    }

    logs[1] = logs[1].substring(0,logs[1].length - 1)

    for (let l = 0; l < logs.length; l++) {
        let temp = logs[l].split("")
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].match(/[owrybg]/)) {
                switch (temp[i]) {
                    case "o":
                        logStyles[l].push("color: orange")
                    break
                    case "w":
                        logStyles[l].push("color: gainsboro")
                    break
                    case "r":
                        logStyles[l].push("color: tomato")
                    break
                    case "y":
                        logStyles[l].push("color: gold")
                    break
                    case "b":
                        logStyles[l].push("color: cyan")
                    break
                    case "g":
                        logStyles[l].push("color: seagreen")
                    break
                }
                temp[i] = " %c" + temp[i]
            }
        }
        logs[l] = temp.join("")
        logsReady += logs[l]
    }
    console.log(logsReady, ...logStyles.flat())
}