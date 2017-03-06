import React from 'react';
import Hammer from 'react-hammerjs';

export default class DragBubble extends React.Component{
    constructor(){
        super();
        this.state = {
            bubblePos : {
                x: 290,
                y: 620
            },
            bubbleColor: 'y',
            center: {
                x: 290,
                y: 620
            }
        };
    }

    handlePan(e){
        switch(e.type){
            case 'panstart':
                console.log(e);
                break;
            case 'pan':
                this.setState({
                    bubblePos: {
                        x: this.state.center.x + e.deltaX,
                        y: this.state.center.y + e.deltaY,
                    }
                });
                break;
            case 'panend':
                this.setState({
                    bubblePos: {
                        x: this.state.center.x,
                        y: this.state.center.y,
                    }
                });
                console.log(e);
                break;
        }

        
        
    }

    render(){

        return(
            <div style={{position: 'absolute', zIndex: 999}}>
                <svg width="580" height="860" viewBox="0 0 580 860" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <line strokeWidth="5" stroke="#2b3137" strokeDasharray="15,10" strokeOpacity="0.6" x1={this.state.center.x*2-this.state.bubblePos.x} y1={this.state.center.y*2-this.state.bubblePos.y} x2={this.state.bubblePos.x} y2={this.state.bubblePos.y} />
                    <circle cx={this.state.center.x} cy={this.state.center.y} r="10" fill="#2b3137" />
                </svg>
                <div id="bragBubble" className={'bubble ' + this.state.bubbleColor} style={{left:this.state.bubblePos.x+'px',top:this.state.bubblePos.y+'px'}} ></div>

                <Hammer
                    onPanStart={this.handlePan.bind(this)} 
                    onPan={this.handlePan.bind(this)} 
                    onPanEnd={this.handlePan.bind(this)} 
                >
                    <div id="dragArea"></div>
                </Hammer>
            </div>
        )
    }   
}