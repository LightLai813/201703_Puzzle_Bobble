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
        isSet: false,
        isFly: false
    };
}

let randomColor = (colorArray) =>{
    function rndInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); };
    return colorArray[rndInt(0, colorArray.length-1)];;
}

let shotBubble = (bubbles, shotBubble, angle, strong) => {
    // 算出球軌跡
    // x: 290
    // y: 638
    var newShotBubble = shotBubble;
    newShotBubble.angle = angle;
    newShotBubble.strong = strong;
    newShotBubble.isFly = true;

    // 判斷該格是否已有珠
    function checkIsEmpty(pos){
        // row 確認
        let row, col;
        row = Math.round((pos.y-27)/47)-1;
        if(row < 0){
            row = 0;
        } 

        // col 確認
        if(row%2==0){
            col = Math.floor(pos.x/58);
        }else{
            col = Math.floor((pos.x-29)/58);
        }

        if(col<0){
            col = 0;
        }else if(col>8){
            col = 8;
        }


    }
    return shotBubble;
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
                shotBubble: shotBubble(state.bubbles, state.shotBubble, action.angle, action.strong)
            };

        default:
            return state
    }
}
