import React from "react";
import Hammer from 'react-hammerjs'

import DragBubble from '../components/DragBubble.jsx';
import Bubble from '../components/Bubble.jsx';
import Dragon from '../components/Dragon.jsx';

export default class Game extends React.Component{


    render(){
        return(
            <div id="main">
                <DragBubble />
                <Bubble />
                <Dragon />
            </div>
        )
    }
}