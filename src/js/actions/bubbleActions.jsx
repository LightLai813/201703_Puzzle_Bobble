export const getDefaultBubbles = () => ({
    type: 'GET_DEFAULT_BUBBLES'
})

export const doneSetBubbles = () => ({
    type: 'DONE_SET_BUBBLES'
})


export const getShotBubble = () =>({
    type: 'GET_SHOT_BUBBLE'
})

export const doneSetShotBubble = () =>({
    type: 'DONE_SET_SHOTBUBBLE'
})

export const shotBubble = (angle, strong) => ({
    type: 'SHOT_BUBBLE',
    angle: angle,
    strong: strong
})
