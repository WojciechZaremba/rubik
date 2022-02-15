//////////////////////////// for testing purposes ////////////////////////////
    const root = {
        id: 0,
        depth: 0,
        str: "abcdef",
        parent: null,
        children: []
    }
    root.str = root.str.split("")
    let id = 0
    let keepSearching = true
    const queue = [root]
    while (queue.length > 0 && keepSearching) {
        let node = queue[0]
        if (node.str.length > 0) {
            for (let i = 0; i < node.str.length; i++) {
                id++
                let child = {
                    id: id,
                    depth: node.depth + 1,
                    str: node.str.map(a => a),
                    parent: node,
                    children: []
                }
                if (child.str[i] != "f") {
                    child.str[i] = "f"
                    node.children.push(child)
                    queue.push(child)
                    if (child.str.join("") === "ffffff")  {
                        keepSearching = false
                        console.log(child)
                        break
                    } else if ( child.depth === 10) {
                        keepSearching = false
                        child.depth = "max"
                        console.log(child)
                        break
                    }
                }
            } 
        }
        queue.shift()
    }



