import React, { useState } from 'react';
import BoardService from '../Service/BoardService';
import { useNavigate } from 'react-router-dom';
function CreateBoardComponent() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        type: 1,
        title: '',
        contents: '',
        memberId: ''
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
        setState({ ...state, memberId: event.target.value });
    };

    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: Number(state.type),
            title: state.title,
            contents: state.contents,
            memberId: state.memberId
        };console.log(board)
        BoardService.createBoard(board).then((res) => {
            cancel();
        });
    };

    const cancel = () => {
        navigate('/list-board');
    };

    return (
        <div className='listDivWrrap c-wwarp'>
            <div className="container">
                <div className="row create-board-wrrap">
                    <div className="card col-md-6 offset-md-3 offset-md-3 c-wrrap1">
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
                                        <option value="1">자유 게시판</option>
                                        <option value="2">질문과 답변 게시판</option>
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
                                        className="form-control contents"
                                        value={state.contents}
                                        onChange={changeContentsHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> MemberNo </label>
                                    <input
                                        placeholder="member_if"
                                        name="member_id"
                                        className="form-control"
                                        value={state.memberId}
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
