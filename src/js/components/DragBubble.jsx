import React from 'react';
import Hammer from 'react-hammerjs';

import { connect } from 'react-redux';
import { shotBubble, getShotBubble, doneSetShotBubble } from '../actions/bubbleActions';

export class DragBubble extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bubblePos : {
                x: 290,
                y: 638
            },
            center: {
                x: 290,
                y: 638
            },
            bubbleColor: null,
            isDrag: false,
            zoom: 1,
            shotMsg: ''
        };
    }

    componentWillMount() {
        this.props.getShotBubble();
    }

    // 接收到上層 props 有更動 
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
         // 更新彈射泡泡
        let isUpdate = false;
        if(!nextProps.bubbleS.isSet){
            this.setState({
                bubbleColor: nextProps.bubbleS.color,
            });

            this.props.doneSetShotBubble();
            isUpdate = true;
        }

        // 更新 zoom 值
        if(nextProps.zoom != this.state.zoom){
            this.setState({
                zoom: nextProps.zoom
            });
            isUpdate = true;
        }

        return isUpdate;
    }

    componentWillUpdate(nextProps, nextState){
        if(!nextState.isDrag && nextState.shotMsg != ''){
            setTimeout(function(){
                this.setState({
                    shotMsg: ''
                });
            }.bind(this), 1500);
        }
    }

    handlePan(e){
        e.preventDefault();

        switch(e.type){
            case 'panstart':
                this.setState({
                    isDrag: true
                });
                break;
            case 'pan':
                this.setState({
                    bubblePos: {
                        x: this.state.center.x + e.deltaX/this.state.zoom,
                        y: this.state.center.y + e.deltaY/this.state.zoom,
                    }
                });
                break;
            case 'panend':
                let msg = '';
                let angle = this.getAngel(this.state.bubblePos, this.state.center);
                angle = (angle > 180 ? angle-360:angle);

                if(Math.abs(angle) >= 90){
                    msg = 'BAD SHOT';
                }else{
                     const getStrong = (p1, p2) => {
                        return Math.sqrt(Math.pow((p1.x-p2.x),2) + Math.pow((p1.y-p2.y),2));
                    }
                    this.props.shotBubble(this.state.bubbleColor, angle, getStrong(this.state.bubblePos, this.state.center));
                    msg = 'NICE SHOT';
                }

                this.setState({
                    bubblePos: {
                        x: this.state.center.x,
                        y: this.state.center.y
                    },
                    shotMsg: msg,
                    isDrag: false
                });
                break;
        }
    }

    getAngel(bp,ep){
        var res=(Math.atan2(ep.y-bp.y,ep.x-bp.x))/Math.PI*180;
        return (res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
    }

    render(){
        const arrowCenter = {
            x: this.state.center.x*2-this.state.bubblePos.x,
            y: this.state.center.y*2-this.state.bubblePos.y
        };

        const angle = this.getAngel(arrowCenter, this.state.center);

        const arrowRP = {
            x:arrowCenter.x + 10*Math.cos((angle-45)*Math.PI/180),
            y:arrowCenter.y + 10*Math.sin((angle-45)*Math.PI/180),
        };

        const arrowLP = {
            x:arrowCenter.x + 10*Math.cos((angle+225)*Math.PI/180),
            y:arrowCenter.y + 10*Math.sin((angle+225)*Math.PI/180),
        };

        return(
            <div style={{position: 'absolute', zIndex: 999}}>
                <svg width="580" height="860" viewBox="0 0 580 860" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <line 
                        strokeWidth="2" 
                        stroke="#2b3137" 
                        strokeDasharray="15,10" 
                        strokeOpacity="0.6" 
                        x1={arrowCenter.x} 
                        y1={arrowCenter.y} 
                        x2={this.state.bubblePos.x} 
                        y2={this.state.bubblePos.y} 
                    />
                    <line 
                        strokeWidth="4" 
                        stroke="#2b3137"
                        strokeLinecap="round"  
                        x1={arrowCenter.x} 
                        y1={arrowCenter.y} 
                        x2={arrowRP.x} 
                        y2={arrowRP.y} 
                    />
                     <line 
                        strokeWidth="4" 
                        stroke="#2b3137" 
                        strokeLinecap="round" 
                        x1={arrowCenter.x} 
                        y1={arrowCenter.y} 
                        x2={arrowLP.x} 
                        y2={arrowLP.y} 
                    />
                    <circle 
                        cx={this.state.center.x} 
                        cy={this.state.center.y} 
                        r="24" 
                        fill="rgba(255, 255, 255, .5)"
                        strokeWidth="2" 
                        stroke="#2b3137" 
                    />
                    <circle 
                        cx={this.state.center.x} 
                        cy={this.state.center.y} 
                        r="10" 
                        fill="#2b3137" 
                    />
                </svg>
                <div id="bragBubble" className={'bubble ' + this.state.bubbleColor} style={{left:this.state.bubblePos.x+'px',top:this.state.bubblePos.y+'px'}} ></div>

                <div className="bigMSG">{this.state.shotMsg}</div>

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

const mapStateToProps = (state) => ({
    bubbleS: state.bubbleReducer.shotBubble,
    zoom: state.envReducer.zoom
})

const mapDispatchToProps = {
    getShotBubble: getShotBubble,
    doneSetShotBubble: doneSetShotBubble,
    shotBubble: shotBubble,
}

export default connect(  
    mapStateToProps,
    mapDispatchToProps
)(DragBubble)