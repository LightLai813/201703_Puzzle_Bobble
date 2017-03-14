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
                bubbles[i].push({color: 'n', state: 'none'});
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

function updateBubbles(bubbles, bullet, coordinate, color){
    let newBubbles = bubbles;

     for(var i=0, row; row=newBubbles[i]; i++){
        for(var j=0; j < newBubbles[i].length; j++){
            if(newBubbles[i][j].color != 'n'){
                newBubbles[i][j].state = 'uncheck';
            }
        }
    }

    // 判斷鄰居是否也是同色系
    let clearCount = 1;
    isNeighborSameColor(newBubbles, coordinate, color);
    function isNeighborSameColor(bubbles, basic, color){
        var checkItems = getNeighbors(basic);

        for(var i=0, checkItem; checkItem = checkItems[i];i++){
            if(bubbles[checkItem.row][checkItem.col].color == color && bubbles[checkItem.row][checkItem.col].state == 'uncheck'){
                clearCount++;
                bubbles[checkItem.row][checkItem.col].state = 'clear';
                isNeighborSameColor(bubbles, checkItem, color);
            }
        }
    }

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
            Neighbors.push({row: (basic.row+1), col: (basic.col)});
            Neighbors.push({row: (basic.row+1), col: (basic.col+1)});

            if(basic.col > 0){
                Neighbors.push({row: (basic.row), col: (basic.col-1)});
            } 
            
            if(basic.col < 8){
                Neighbors.push({row: (basic.row), col: (basic.col+1)});
            }
        }

        return Neighbors;
    }

    if(clearCount >= 3){
        newBubbles[coordinate.row][coordinate.col] = {color:bullet.color, state: 'clear'};

        
        // 解決浮動泡泡
        for(var i=0, row; row=newBubbles[i]; i++){
            for(var j=0; j < newBubbles[i].length; j++){
                if(i=0){
                    if(newBubbles[i][j].state == 'uncheck'){
                        newBubbles[i][j].state = 'live';
                    }
                }else if(newBubbles[i][j].state=='uncheck'){
                    isFloat({row: i, col: j});
                }
            }
        }

        function isFloat(basic){
            var Neighbors = getNeighbors(basic);
            var isFloat = true;
            newBubbles[basic.row][basic.col].state = 'checkednotsure';

            for(var k=0,Neighbor; Neighbor = Neighbors[k];k++){
                if(newBubbles[Neighbor.row][Neighbor.col].state == 'checkednotsure'){
                    continue;
                }

                if(newBubbles[Neighbor.row][Neighbor.col].state = 'live'){
                    newBubbles[basic.row][basic.col].state = 'live';
                    isFloat = false;
                    break;
                }else if(newBubbles[Neighbor.row][Neighbor.col].state = 'uncheck'){
                    // 若是鄰居也不是很確定，先記錄忽略它，再由它去找下一個
                    // 這邊再檢查 有bug
                    if(!isFloat(Neighbor)){
                        newBubbles[basic.row][basic.col].state = 'live';
                        isFloat = false;
                    }
                }
            }

            if(isFloat){
                newBubbles[basic.row][basic.col].state = 'float';
            }
            return isFloat;
        }
    }else{
        newBubbles[coordinate.row][coordinate.col] = {color:bullet.color, state: 'live'};
    }

    return newBubbles;
}

function clearUnliveBubbles(bubbles){
    let newBubbles = bubbles;

    for(var i=0, row; row=newBubbles[i]; i++){
        for(var j=0; j < newBubbles[i].length; j++){
            if(newBubbles[i][j].state == 'clear' || newBubbles[i][j].state == 'float'){
                newBubbles[i][j] = {color: 'n', state: 'none'};
            }
        }
    }

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
                bubbles: updateBubbles(state.bubbles, state.bullet, action.coordinate, state.bullet.color),
                bullet: getBullet()
            };

        default:
            return state
    }
}
