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
                    Spring boot, React 게시판
                </header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className='navDiv'>
                            <div><a href="http://localhost:3000" className="navbar-brand"> Board-Main-App</a></div>
                            <div><a href="http://localhost:3000/list-board" className="navbar-brand"> Board-List-App</a></div>
                            <div><a href="http://localhost:3000/create-board" className="navbar-brand"> Board-create-App</a></div>
                        </div>
                    </nav>

            </div>
        );
    }
}

export default HeaderComponent;