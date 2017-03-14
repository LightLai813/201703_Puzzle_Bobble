import React from 'react';

import { connect } from 'react-redux';
import { getDefaultBubbles, doneSetBubbles, clearUnliveBubbles } from '../actions/bubbleActions';

class Bubbles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bubble: [],
            disapperAni: false
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
                        style += ' disapper';
                    }
                    showBubbles.push({row: i, col:  j, color: style});
                    
                }
            }

            this.setState({
                bubble: showBubbles,
                disapperAni: disapperAni
            });


            this.props.doneSetBubbles();
            return true;
        }
    }

    // 更新前動作
    componentWillUpdate(nextProps, nextState){
        if(nextState.disapperAni){
            setTimeout(function(){
                this.props.clearUnliveBubbles();
            }.bind(this), 1000);
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

    render(){
        return(
            <div>
                {this.state.bubble.map(this.eachBubble.bind(this))}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    bubbles: state.bubbleReducer.bubbles,
    needUpdateBubbles: state.bubbleReducer.needUpdateBubbles
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