import React from "react";
import Hammer from 'react-hammerjs'

import Bullet from '../components/Bullet.jsx';
import Bubbles from '../components/Bubbles.jsx';
import Dragon from '../components/Dragon.jsx';

export default class Game extends React.Component{
    render(){
        return(
            <div id="main">
                <Bullet />
                <Bubbles />
                <Dragon />
            </div>
        )
    }
}