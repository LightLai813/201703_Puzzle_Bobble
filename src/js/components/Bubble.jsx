import React from 'react';

export default class Bubble extends React.Component{
    constructor(){
        super();
        this.state = {
            bubble: [
                {row: 1, col: 1, color: 'y'},
                {row: 1, col: 2, color: 'y'},
                {row: 1, col: 3, color: 'b'},
                {row: 1, col: 4, color: 'b'},
                {row: 2, col: 3, color: 'r'},
                {row: 3, col: 1, color: 'r'},
                {row: 3, col: 2, color: 'y'},
                {row: 3, col: 3, color: 'b'},
                {row: 4, col: 4, color: 'y'},
                {row: 4, col: 3, color: 'g'},
                {row: 4, col: 4, color: 'g'}
            ]
        }
    }

     eachBubble(obj, i){
        const styleOption ={
            left: (obj.col*10+((obj.row%2)*5)) + '%',
            top: (obj.row*47-20) + 'px'
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