
let getDefaultBubbles = ()=>{
    let bubbles = [];
    var colorArr = ['r','g','b','y'];
    for(var i=0; i<12; i++){
        bubbles.push([]);
        colorArr.push('n');

        for(var j=0; j<(i%2==0?10:9); j++){
            if(
                i==0 || 
                (i%2==1 && (bubbles[i-1][j] != 'n' || bubbles[i-1][(j+1>8?8:j+1)] != 'n')) || 
                (i%2==0 && (bubbles[i-1][(j-1<0?0:j-1)] != 'n' || bubbles[i-1][(j>8?8:j)] != 'n')) 
            ){
                bubbles[i].push(randomColor(colorArr));
            }else{
                bubbles[i].push('n');
            }
        }
    }

    return bubbles;
}

let getShotBubble = ()=>{
    return {
        x: 290,
        y: 638,
        angle: 0,
        strong: 0,
        color: randomColor(['r','g','b','y']),
        isSet: false
    };
}

let randomColor = (colorArray) =>{
    function rndInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); };
    return colorArray[rndInt(0, colorArray.length-1)];;
}

let shotBubble = (bubbles, color, angle, strong) => {
    console.log(angle);
    return bubbles
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'GET_DEFAULT_BUBBLES':
            return {
                ...state,
                needUpdateBubbles: true,
                bubbles: getDefaultBubbles()
            };

        case 'DONE_SET_BUBBLES':
            return {
                ...state,
                needUpdateBubbles: false
            };

        case 'GET_SHOT_BUBBLE':
            return {
                ...state,
                shotBubble: getShotBubble()
            };

        case 'DONE_SET_SHOTBUBBLE':
            return {
                ...state,
                shotBubble: {
                    ...state.shotBubble,
                    isSet: true
                }
            };

        case 'SHOT_BUBBLE':
            return {
                ...state,
                bubbles: shotBubble(state.bubbles, action.color, action.angle, action.strong)
            };

        default:
            return state
    }
}
