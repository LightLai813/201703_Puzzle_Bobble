let getDefaultBubbles = ()=>{
    let bubbles = [];
    var colorArr = ['r','g','b','y'];
    for(var i=0; i<16; i++){
        bubbles.push([]);
        colorArr.push('n');

        for(var j=0; j<(i%2==0?10:9); j++){
            if(
                i < 12 && 
                (
                    i==0 || 
                    (i%2==1 && (bubbles[i-1][j] != 'n' || bubbles[i-1][(j+1>8?8:j+1)] != 'n')) || 
                    (i%2==0 && (bubbles[i-1][(j-1<0?0:j-1)] != 'n' || bubbles[i-1][(j>8?8:j)] != 'n')) 
                )
            ){
                bubbles[i].push(randomColor(colorArr));
            }else{
                bubbles[i].push('n');
            }
        }
    }

    return bubbles;
}

let getBullet = ()=>{
    return {
        color: randomColor(['r','g','b','y']),
        isSet: false
    };
}

function randomColor(colorArray){
    function rndInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); };
    return colorArray[rndInt(0, colorArray.length-1)];;
}

function updateBubbles(bubbles, bullet, coordinate){
    let newBubbles = bubbles;
    newBubbles[coordinate.row][coordinate.col] = bullet.color;

    


    return newBubbles;
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

        case 'GET_BULLET':
            return {
                ...state,
                bullet: getBullet()
            };

        case 'DONE_SET_BULLET':
            return {
                ...state,
                bullet: {
                    ...state.bullet,
                    isSet: true
                }
            };

        case 'SHOT_BULLET':
            return {
                ...state,
                needUpdateBubbles: true,
                bubbles: updateBubbles(state.bubbles, state.bullet, action.coordinate),
                bullet: getBullet()
            };

        default:
            return state
    }
}
