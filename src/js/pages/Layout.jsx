import React from "react";
import { Link } from "react-router";

import { connect } from 'react-redux';
import { setViewZoom } from '../actions/envActions';

class Layout extends React.Component {
    componentDidMount(){
        const bodyW =  document.body.clientWidth,
              bodyH = document.body.clientHeight - 90,
              mainW = document.getElementById('main').clientWidth,
              mainH = document.getElementById('main').clientHeight;
        let zoomN = 1;

        if(bodyW/bodyH > 580/860){
            zoomN = bodyH/mainH;
        }else{
            zoomN = bodyW/mainW;
        }

        document.getElementById('main').style.zoom = zoomN;
        this.props.setViewZoom(zoomN);
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


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    setViewZoom: setViewZoom
}

export default connect(  
    mapStateToProps,
    mapDispatchToProps
)(Layout)

class Header extends React.Component {
    render() {
        return (
            <header>
                Puzzle Bubble
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
