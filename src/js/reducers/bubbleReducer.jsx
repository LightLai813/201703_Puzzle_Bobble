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
                    (i%2==1 && (bubbles[i-1][j].color != 'n' || bubbles[i-1][(j+1>8?8:j+1)].color != 'n')) || 
                    (i%2==0 && (bubbles[i-1][(j-1<0?0:j-1)].color != 'n' || bubbles[i-1][(j>8?8:j)].color != 'n')) 
                )
            ){
                bubbles[i].push({color: randomColor(colorArr), state: 'live'});
            }else{
                bubbles[i].push({color: 'n', state: null});
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

function updateBubbles(state, coordinate){
    let newBubbles = state.bubbles;

    for(var i=0; i<newBubbles.length; i++){
        for(var j=0; j < newBubbles[i].length; j++){
            if(newBubbles[i][j].color != 'n'){
                newBubbles[i][j].state = 'float';
            }
        }
    }

    // 判斷鄰居是否也是同色系
    let clearItems = [];
    isNeighborSameColor(newBubbles, coordinate, state.bullet.color);
    function isNeighborSameColor(bubbles, basic, color){
        var checkItems = getNeighbors(basic);

        for(var i=0, checkItem; checkItem = checkItems[i];i++){
            if(newBubbles[checkItem.row][checkItem.col].color == color && newBubbles[checkItem.row][checkItem.col].state == 'float'){
                clearItems.push(checkItem);
                newBubbles[checkItem.row][checkItem.col].state = 'clear';
                isNeighborSameColor(newBubbles, checkItem, color);
            }
        }
    }

    if(clearItems.length >= 2){
        newBubbles[coordinate.row][coordinate.col] = {color:state.bullet.color, state: 'clear'};
    }else{
        if(clearItems[0]){
            newBubbles[clearItems[0].row][clearItems[0].col] = {color:state.bullet.color, state: 'waitLive'};
        }
        newBubbles[coordinate.row][coordinate.col] = {color:state.bullet.color, state: 'waitLive'};
    }

    // 解決浮動泡泡，把有跟第一層連接的泡泡都設為 live
    for(var i=0; i<newBubbles[0].length; i++){
        if(newBubbles[0][i].color == 'n' || newBubbles[0][i].state == 'clear'){
            continue;
        }
        newBubbles[0][i].state = 'live';
        setNeighborsToLive({row: 0, col: i});
    }
    
    // 射五次向下降一次
    if(state.shotCount%5 == 0){
        newBubbles.pop();
        newBubbles.pop();

        // 第1排處理
        var newRow0 = [], newRow1 = [];
        for(let i=0; i<10; i++){
            newRow0.push({color: randomColor(['r','g','b','y']), state: 'live'});
        }
        for(let i=0; i<9; i++){
            newRow1.push({color: randomColor(['r','g','b','y']), state: 'live'});
        }

        newBubbles.unshift(newRow0, newRow1);
    }

    // 判斷 是否遊戲結束
    for(var i=0, bubble; bubble=newBubbles[13][i]; i++){
        if(bubble.state == 'live' && bubble.color != 'n'){
            state.gameOver = true;
        }
    }

    return newBubbles;


    // 取得鄰居
    function getNeighbors(basic){
        var Neighbors = [];
        if(basic.row == 0){
            if(basic.col > 0){
                Neighbors.push({row: (basic.row), col: (basic.col-1)});
                Neighbors.push({row: (basic.row+1), col: (basic.col-1)});
            } 

            if(basic.col < 9){
                Neighbors.push({row: (basic.row), col: (basic.col+1)});
                Neighbors.push({row: (basic.row+1), col: (basic.col)});
            } 
        } else if(basic.row%2 == 0){
            if(basic.col > 0){
                Neighbors.push({row: (basic.row-1), col: (basic.col-1)});
                Neighbors.push({row: (basic.row), col: (basic.col-1)});
                Neighbors.push({row: (basic.row+1), col: (basic.col-1)});
            } 
            
            if(basic.col < 9){
                Neighbors.push({row: (basic.row-1), col: (basic.col)});
                Neighbors.push({row: (basic.row), col: (basic.col+1)});
                Neighbors.push({row: (basic.row+1), col: (basic.col)});
            }
        } else {
            Neighbors.push({row: (basic.row-1), col: (basic.col)});
            Neighbors.push({row: (basic.row-1), col: (basic.col+1)});

            if(basic.col > 0){
                Neighbors.push({row: (basic.row), col: (basic.col-1)});
            } 
            
            if(basic.col < 8){
                Neighbors.push({row: (basic.row), col: (basic.col+1)});
            }

            Neighbors.push({row: (basic.row+1), col: (basic.col)});
            Neighbors.push({row: (basic.row+1), col: (basic.col+1)});
        }

        return Neighbors;
    }

    // 判斷是否浮動
    function setNeighborsToLive(basic){
        var Neighbors = getNeighbors(basic);
        for(var k=0,Neighbor; Neighbor = Neighbors[k];k++){
            if(newBubbles[Neighbor.row][Neighbor.col].state == 'float' || newBubbles[Neighbor.row][Neighbor.col].state == 'waitLive'){
                newBubbles[Neighbor.row][Neighbor.col].state = 'live';
                setNeighborsToLive(Neighbor);
            }
        }
    }
}

function clearUnliveBubbles(bubbles){
    let newBubbles = bubbles;

    for(var i=0, row; row=newBubbles[i]; i++){
        for(var j=0; j < newBubbles[i].length; j++){
            if(newBubbles[i][j].state == 'clear' || newBubbles[i][j].state == 'float'){
                newBubbles[i][j] = {color: 'n', state: null};
            }
        }
    }

    return newBubbles;
}

export default function reducer(state = {
    shotCount: 1,
    gameOver: false
}, action) {
    switch (action.type) {
        case 'GET_DEFAULT_BUBBLES':
            return {
                ...state,
                needUpdateBubbles: true,
                bubbles: getDefaultBubbles(),
            };

        case 'DONE_SET_BUBBLES':
            return {
                ...state,
                needUpdateBubbles: false
            };

        case 'CLEAR_UNLIVE_BUBBLES':
            return {
                ...state,
                needUpdateBubbles: true,
                bubbles: clearUnliveBubbles(state.bubbles)
            }

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
                bubbles: updateBubbles(state, action.coordinate),
                bullet: getBullet(),
                shotCount: (++state.shotCount)

            };

        default:
            return state
    }
}
