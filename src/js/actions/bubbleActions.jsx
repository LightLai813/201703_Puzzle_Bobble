export const getDefaultBubbles = () => ({
    type: 'GET_DEFAULT_BUBBLES'
})

export const doneSetBubbles = () => ({
    type: 'DONE_SET_BUBBLES'
})

export const getBullet = () =>({
    type: 'GET_BULLET'
})

export const doneSetBullet = () =>({
    type: 'DONE_SET_BULLET'
})

export const shotBullet = (coordinate) =>({
    type: 'SHOT_BULLET',
    coordinate: coordinate
})
