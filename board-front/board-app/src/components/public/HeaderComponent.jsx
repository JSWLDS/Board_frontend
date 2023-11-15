import React, { Component } from 'react';
import NavComponent from './NavComponent';
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
               
                    <h1>Spring boot, React 게시판</h1>
                    <div>
                        <div>
                        
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            <a href="http://localhost:3000/login" className='login'>로그인</a>
                        </div>
                    </div>
                </header>
                  <NavComponent/>
            </div>
        );
    }
}

export default HeaderComponent;