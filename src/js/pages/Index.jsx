import React from "react";
import { Link } from "react-router";

export default class Game extends React.Component{
    render(){
        return(
            <div id="main">
                <Link to="game" className="BTN_Start">開始遊戲</Link>
            </div>
        )
    }
}