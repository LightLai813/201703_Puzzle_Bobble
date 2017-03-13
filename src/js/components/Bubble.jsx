import React from 'react';

import { connect } from 'react-redux';
import { getDefaultBubbles, doneSetBubbles } from '../actions/bubbleActions';

class Bubble extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bubble: []
        }
    }

    componentWillMount() {
        this.props.getDefaultBubbles();
    }

    // 接收到上層 props 有更動 
    componentWillReceiveProps(nextProps){
        if(nextProps.needUpdateBubbles){
            let showBubbles = [];
            const bubbles = nextProps.bubbles;
           
            for(var i=0; i<bubbles.length;i++){
                for(var j=0; j<bubbles[i].length;j++){
                    showBubbles.push({row: i, col:  j, color: bubbles[i][j]});
                }
            }

            this.setState({
                bubble: showBubbles,
            });


            this.props.doneSetBubbles();
            return true;
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
    doneSetBubbles: doneSetBubbles
}

export default connect(  
    mapStateToProps,
    mapDispatchToProps
)(Bubble)