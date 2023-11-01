import React, { useState } from 'react';
import BoardService from '../Service/BoardService';

function CreateBoardComponent(props) {
    const [state, setState] = useState({
        type: '',
        title: '',
        contents: '',
        memberNo: ''
    });

    const changeTypeHandler = (event) => {
        setState({ ...state, type: event.target.value });
    };

    const changeTitleHandler = (event) => {
        setState({ ...state, title: event.target.value });
    };

    const changeContentsHandler = (event) => {
        setState({ ...state, contents: event.target.value });
    };

    const changeMemberNoHandler = (event) => {
        setState({ ...state, memberNo: event.target.value });
    };

    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: state.type,
            title: state.title,
            contents: state.contents,
            memberNo: state.memberNo
        };
        BoardService.createBoard(board).then((res) => {
            props.history.push('/board');
        });
    };

    const cancel = () => {
        props.history.push('/board');
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">새글을 작성해주세요</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Type </label>
                                    <select
                                        placeholder="type"
                                        name="type"
                                        className="form-control"
                                        value={state.type}
                                        onChange={changeTypeHandler}
                                    >
                                        <option value="1">자유게시판</option>
                                        <option value="2">질문과 답변</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> Title </label>
                                    <input
                                        type="text"
                                        placeholder="title"
                                        name="title"
                                        className="form-control"
                                        value={state.title}
                                        onChange={changeTitleHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Contents </label>
                                    <textarea
                                        placeholder="contents"
                                        name="contents"
                                        className="form-control"
                                        value={state.contents}
                                        onChange={changeContentsHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> MemberNo </label>
                                    <input
                                        placeholder="memberNo"
                                        name="memberNo"
                                        className="form-control"
                                        value={state.memberNo}
                                        onChange={changeMemberNoHandler}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={createBoard}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBoardComponent;
