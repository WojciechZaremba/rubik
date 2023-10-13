function node(_state, _parentNode, _prevMove) {
    // const prev = {
    //             face: undefined,
    //             direction: undefined,
    //             double: undefined,
    //             cornerSpin: undefined,
    //             magicSeven: undefined,
    //             magic27: undefined,
    //             magic47: undefined,
    //             cornerNum: undefined,
    //         }
    // Object.assign(prev, _prevMove)
    return {
            depth: _parentNode.depth + 1,
            //id: undefined,
            state: _state,
            prevMove: _prevMove,  
            parent: _parentNode,
            children: []
            }
}