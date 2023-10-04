function node(_state, _parentNode, _prevMove) {
    const prev = {}
    return {
            depth: _parentNode.depth + 1,
            id: undefined,
            state: _state,
            prevMove: _prevMove,  
            parent: _parentNode,
            children: []
            }
}