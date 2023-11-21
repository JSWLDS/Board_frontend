import React, { Component } from 'react';

class NavComponent extends Component {
    render() {
        return (
           
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className='navDiv'>
                <div><a href="http://localhost:3000" className="navbar-brand"> Board-Main-App</a></div>
                <div><a href="http://localhost:3000/list-board/all" className="navbar-brand">전체 게시판</a></div>
                <div><a href="http://localhost:3000/list-board/free" className="navbar-brand">자유게시판</a></div>
                <div><a href="http://localhost:3000/list-board/question" className="navbar-brand">질문과 답변 게시판</a></div>
                <div><a href="http://localhost:3000/create-board/all" className="navbar-brand"> Board-create-App</a></div>
            </div>
            </nav>

        );
    }
}

export default NavComponent;