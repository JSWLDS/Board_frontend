import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="http://localhost:3000" className="navbar-brand"> Board-Main-App</a></div>
                        <div><a href="http://localhost:3000/list-board" className="navbar-brand"> Board-List-App</a></div>
                        <div><a href="http://localhost:3000/create-board" className="navbar-brand"> Board-create-App</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;