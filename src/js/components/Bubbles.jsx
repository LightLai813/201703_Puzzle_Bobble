import React from 'react';

import { connect } from 'react-redux';
import { getDefaultBubbles, doneSetBubbles, clearUnliveBubbles } from '../actions/bubbleActions';

class Bubbles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bubble: [],
            disapperAni: false,
            moveArea: false,
            shotMsg: ''
        }
    }

    componentWillMount() {
        this.props.getDefaultBubbles();
    }

    // 接收到上層 props 有更動 
    componentWillReceiveProps(nextProps){
        if(nextProps.needUpdateBubbles){
            let disapperAni = false;
            let showBubbles = [];
            const bubbles = nextProps.bubbles;

            for(var i=0, bubbleRow; bubbleRow=bubbles[i]; i++){
                for(var j=0, item; item=bubbleRow[j]; j++){
                    var style=item.color;
                    if(item.state == 'clear'){
                        disapperAni = true;
                        style += ' clear';
                    }else if(item.state == 'float'){
                        disapperAni = true;
                        style += ' float';
                    }
                    showBubbles.push({row: i, col:  j, color: style});
                    
                }
            }

            let moveArea = false;
            if(nextProps.shotCount%5==1){
                moveArea = true;
            }

            let msg = nextProps.gameOver ? 'GAME OVER': disapperAni ? 'NICE SHOT':'';

            this.setState({
                bubble: showBubbles,
                disapperAni: disapperAni,
                moveArea: moveArea,
                shotMsg: msg
            });



            this.props.doneSetBubbles();
            return true;
        }
    }

    // 更新前動作
    componentWillUpdate(nextProps, nextState){
        if(nextProps.gameOver != this.props.gameOver){
            this.setGameOver(0);
        }else if(nextState.disapperAni){
            setTimeout(function(){
                this.props.clearUnliveBubbles();
            }.bind(this), 1000);
        }

    }

    setGameOver(index){
        let newBubbles = this.state.bubble;
        for(var i=0, bubble; bubble = newBubbles[i]; i++){
            if(bubble.row ==  index && bubble.color != 'n'){
                bubble.color = 'gray';
            }
        }
        this.setState({
            bubble: newBubbles
        });

        if(index < 14){
            setTimeout(function(){
                this.setGameOver(++index);
            }.bind(this), 100);
        }

    }

    eachBubble(obj, i){
        const styleOption ={
            left: ((obj.col+1)*58+(((obj.row+1)%2)*-29)) + 'px',
            top: ((obj.row+1)*47-20) + 'px'
        }

        return (
            <div key={i} className={'bubble ' + obj.color} style={styleOption} ></div>
        );
    }

    checkIsMoveDown(){
        if(this.state.moveArea){
            return 'movedown';
        }else{
            return '';
        }
    }

    bigMsg(){
        if( this.state.shotMsg != ''){
            return (
                <div className="bigMSG">{this.state.shotMsg}</div>
            )
        }else{
            return false;
        } 
    }

    render(){
        return(
            <div>
                <div id="bubbleArea" className={this.checkIsMoveDown()}>
                    {this.state.bubble.map(this.eachBubble.bind(this))}
                </div>
                {this.bigMsg()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bubbles: state.bubbleReducer.bubbles,
    needUpdateBubbles: state.bubbleReducer.needUpdateBubbles,
    shotCount: state.bubbleReducer.shotCount,
    gameOver: state.bubbleReducer.gameOver
})

const mapDispatchToProps = {
    getDefaultBubbles: getDefaultBubbles,
    doneSetBubbles: doneSetBubbles,
    clearUnliveBubbles: clearUnliveBubbles
}

export default connect(  
    mapStateToProps,
    mapDispatchToProps
)(Bubbles)