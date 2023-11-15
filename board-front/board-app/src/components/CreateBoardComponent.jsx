import React, { useState } from 'react';
import BoardService from '../Service/BoardService';
import { useNavigate } from 'react-router-dom';
function CreateBoardComponent() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        type: 1,
        title: '',
        contents: '',
        userId: ''
    });

    const changeTypeHandler = (event) => {
        // 구조분해문법을 이용하여 생략해봄.
        const {value} = event.target;
        setState({ ...state, type: value });
    };
    
    const changeTitleHandler = (event) => {
        const {value} = event.target;
        setState({ ...state, title: value });
    };

    const changeContentsHandler = (event) => {
        const maxLength = 3000;
        const {value} = event.target;
        if(value.length > maxLength){
            alert(maxLength+'자 이하로 작성해주세요.');
            // 현재는 state값이 아닌 textatrea의 value값을 가지고 온 것이다. state.contents.value의 값을 가지고 오면
            // slice 에러가 난다. 문자열가 3000개 없는 데 혹은 없는 데 3000개로 자르려고 해서 에러가 난다.
            const maxLengthContents = value.slice(0, maxLength);
            setState({ ...state, contents: maxLengthContents });
        }
        else{
            setState({ ...state, contents: value });
        }
    };

    const changeMemberNoHandler = (event) => {
        const {value} = event.target;
        setState({ ...state, userId: value });
    };

    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: Number(state.type),
            title: state.title,
            contents: state.contents,
            userId: state.userId
        };console.log(board)
        BoardService.createBoard(board).then((res) => {
            cancel();
        });
    };

    const cancel = () => {
        navigate('/list-board');
    };

    return (
        <div className='c-wwarp'>
            <div className="container">
                <div className="create-board-wrrap">
                    <div className="">
                        <h3 className="">새글을 작성해주세요</h3>
                        <div className="">
                            <form>
                                <div className="">
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
                                <div className="">
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
                                <div className="">
                                    <label> Contents </label>
                                    <textarea
                                        placeholder="contents"
                                        name="contents"
                                        id="contents"
                                        className="create-contents"
                                        value={state.contents}
                                        onChange={changeContentsHandler}
                                    />
                                </div>
                                <div className="">
                                    <label> UserId </label>
                                    <input
                                        placeholder="user_if"
                                        name="user_id"
                                        className="form-control"
                                        value={state.userId}
                                        onChange={changeMemberNoHandler}
                                    />
                                </div>
                                <button className="btn-success" onClick={createBoard}>
                                    Save
                                </button>
                                <button
                                    className=""
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
