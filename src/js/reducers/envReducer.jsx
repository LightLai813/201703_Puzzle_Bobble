export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'SET_VIEW_ZOOM':
            return {
                ...state,
                zoom: action.zoom
            };

        default:
            return state
    }
}