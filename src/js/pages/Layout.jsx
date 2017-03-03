import React from "react";
import { Link } from "react-router";

export default class Layout extends React.Component {
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
