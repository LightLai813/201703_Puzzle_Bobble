import React from 'react';
import Hammer from 'react-hammerjs';

import { connect } from 'react-redux';
import { shotBullet, getBullet, doneSetBullet } from '../actions/bubbleActions';

export class DragBubble extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bullet : {
                x: 290,
                y: 732,
                angle: 0,
                color: null,
                isFly: false
            },
            center: {
                x: 290,
                y: 732
            },
            isDrag: false,
            zoom: 1,
            shotMsg: ''
        };
    }

    componentWillMount() {
        this.props.getBullet();
    }

    // 接收到上層 props 有更動 
    componentWillReceiveProps(nextProps){
         // 更新彈射泡泡
        let isUpdate = false;
        if(!nextProps.bullet.isSet){
            this.setState({
                bullet: {
                    x: this.state.center.x,
                    y: this.state.center.y,
                    angle: 0,
                    color: nextProps.bullet.color,
                    isFly: false
                }
            });

            this.props.doneSetBullet();
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
        if(!nextState.isDrag && nextState.bullet.isFly ){
            setTimeout(function(){
                this.moveBullet(false);
            }.bind(this), 33);
        }
    }

    handlePan(e){
        e.preventDefault();

        var angle = this.getAngel({ x: 0, y:0},{x: e.deltaX, y:e.deltaY})-180;
        if(angle > 60) {
            angle = 60
        } else  if(angle < -60) {
            angle = -60;
        }

        var strong = Math.sqrt(Math.pow(e.deltaX, 2)+Math.pow(e.deltaY, 2))/this.state.zoom;
        if(strong > 100){
            strong = 100;
        }

        switch(e.type){
            case 'panstart':
                this.setState({
                    isDrag: true
                });
                break;

            case 'pan':
                this.setState({
                    bullet: {
                        ...this.state.bullet,
                        x: this.state.center.x - strong*Math.sin(angle*Math.PI/180),
                        y: this.state.center.y + strong*Math.cos(angle*Math.PI/180),
                    }
                });
                break;

            case 'panend':
                this.moveBullet(true, angle);
                this.setState({
                    isDrag: false
                });
                break;
        }
    }

    moveBullet(isFirst, angle){
        const moveUnit = 29;            // 移動單位距離
        
        let newBullet = this.state.bullet;
        if(isFirst){
            newBullet.isFly = true;
            newBullet.angle = angle;
            newBullet.x = this.state.center.x;
            newBullet.y = this.state.center.y;
        }

        let rad = newBullet.angle*Math.PI/180;
        for(var i=0; i<3;i++){
            newBullet.x += Math.sin(rad)*moveUnit;
            if(newBullet.x > 580){
                newBullet.x = 580*2-newBullet.x;
                newBullet.angle *= -1;
                rad = newBullet.angle*Math.PI/180;
            }else if(newBullet.x < 0){
                newBullet.x = Math.abs(newBullet.x);
                newBullet.angle *= -1;
                rad = newBullet.angle*Math.PI/180;
            }

            newBullet.y -= Math.cos(rad)*moveUnit;
            
            let bulletCoordinate = getCoordinate(newBullet);
            if(haveNeighbor(this.props.bubbles, bulletCoordinate)){
                this.props.shotBullet(bulletCoordinate);
                this.setState({
                    bullet:{
                        ...this.state.bullet,
                        isFly: false
                    }
                });
                return false;
            }
        }
        
        this.setState({
            bullet: newBullet
        });

        // 回傳相對格數
        function getCoordinate(pos){
            // row 確認
            let row, col;
            row = Math.round((pos.y+27)/47-0.2)-1;
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

            return {row: row, col: col};
        }

        // 確認是否有鄰居
        function haveNeighbor(bubbles,pos){
            var checkItems = [];

            if(pos.row == 0){
                return true;
            } else if(pos.row%2 == 0){
                if(pos.col > 0){
                    checkItems.push({row: (pos.row-1), col: pos.col-1});
                    checkItems.push({row: pos.row, col: (pos.col-1)});
                } 
                
                if(pos.col < 9){
                    checkItems.push({row: (pos.row-1), col: (pos.col)});
                    checkItems.push({row: pos.row, col: (pos.col+1)});
                }
            } else {
                checkItems.push({row: (pos.row-1), col: pos.col});
                checkItems.push({row: (pos.row-1), col: (pos.col+1)});

                if(pos.col > 0){
                    checkItems.push({row: pos.row, col: (pos.col-1)});
                } 
                
                if(pos.col < 8){
                checkItems.push({row: pos.row, col: (pos.col+1)});
                }
            }

            for(var i=0, checkItem; checkItem = checkItems[i];i++){
                if(bubbles[checkItem.row][checkItem.col] != 'n'){
                    return true;
                }
            }

            return false;
        }
    }

    getAngel(bp,ep){
        var res=(Math.atan2(ep.y-bp.y,ep.x-bp.x))/Math.PI*180;
        return (res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
    }

    referenceAxis(){
        if(!this.state.bullet.isFly){
            const arrowCenter = {
                x: this.state.center.x*2-this.state.bullet.x,
                y: this.state.center.y*2-this.state.bullet.y
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
                <svg width="580" height="860" viewBox="0 0 580 860" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <line 
                        strokeWidth="2" 
                        stroke="#2b3137" 
                        strokeDasharray="15,10" 
                        strokeOpacity="0.6" 
                        x1={arrowCenter.x} 
                        y1={arrowCenter.y} 
                        x2={this.state.bullet.x} 
                        y2={this.state.bullet.y} 
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
                        r="15" 
                        fill="rgba(255, 255, 255, .5)"
                        strokeWidth="2" 
                        stroke="#2b3137" 
                    />
                    <circle 
                        cx={this.state.center.x} 
                        cy={this.state.center.y} 
                        r="8" 
                        fill="#2b3137" 
                    />
                </svg>
            )
        }else{
            return false;
        }
        
    }

    render(){
        return(
            <div style={{position: 'absolute', zIndex: 999}}>
                {this.referenceAxis()}
                
                <div id="bragBubble" className={'bubble ' + this.state.bullet.color} style={{left:this.state.bullet.x+'px',top:this.state.bullet.y+'px'}} ></div>

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
    bullet: state.bubbleReducer.bullet,
    bubbles: state.bubbleReducer.bubbles,
    zoom: state.envReducer.zoom
})

const mapDispatchToProps = {
    getBullet: getBullet,
    doneSetBullet: doneSetBullet,
    shotBullet: shotBullet,
}

export default connect(  
    mapStateToProps,
    mapDispatchToProps
)(DragBubble)