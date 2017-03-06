import React from "react";
import { Link } from "react-router";

export default class Layout extends React.Component {
    componentDidMount(){
        const bodyW =  document.body.clientWidth,
              bodyH = document.body.clientHeight - 90,
              mainW = document.getElementById('main').clientWidth,
              mainH = document.getElementById('main').clientHeight;

        if(bodyW/bodyH > 580/860){
            document.getElementById('main').style.zoom = bodyH/mainH;
        }else{
            document.getElementById('main').style.zoom = bodyW/mainW;
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <Header />
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <header>
                Puzzle Bobble
            </header>
        );
    }
}

class Footer extends React.Component {
    render() {
        const nowYear = (new Date()).getFullYear().toString();

        return (
            <footer>
                Copyright &copy; {nowYear} &middot; All Rights Reserved
            </footer>
        );
    }
}
