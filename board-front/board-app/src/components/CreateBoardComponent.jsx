import React, { useState } from 'react';
import BoardService from '../Service/BoardService';
import { useNavigate } from 'react-router-dom';
function CreateBoardComponent() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        board:{
            typeNo: 1,
            title: '',
            contents: '',
            userId: ''
        }
    });

    const changeTypeHandler = (event) => {
        // 구조분해문법을 이용하여 생략해봄.
        const {value} = event.target;
        setState({ ...state.board, typeNo: value });
    };
    
    const changeTitleHandler = (event) => {
        const {value} = event.target;
        setState({ ...state.board, title: value });
    };

    const changeContentsHandler = (event) => {
        const maxLength = 3000;
        const {value} = event.target;
        if(value.length > maxLength){
            alert(maxLength+'자 이하로 작성해주세요.');
            // 현재는 state값이 아닌 textatrea의 value값을 가지고 온 것이다. state.contents.value의 값을 가지고 오면
            // slice 에러가 난다. 문자열이 3000자가 아닌 데 혹은 없는 데 3000개로 자르려고 해서 에러가 난다.
            const maxLengthContents = value.slice(0, maxLength);
            setState({ ...state.board, contents: maxLengthContents });
        }
        else{
            setState({ ...state.board, contents: value });
        }
    };

    const changeMemberNoHandler = (event) => {
        const {value} = event.target;
        setState({ ...state.board, userId: value });
    };

    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            typeNo: Number(state.board.typeNo),
            title: state.board.title,
            contents: state.board.contents,
            userId: state.board.userId
        };
        console.log(board)

        BoardService.createBoard(board).then((res) => {
            goToBoard();
        });
    };

    const goToBoard = () => {

        const getBoardType = state.board.typeNo;        
        let boardType = "";


        if(getBoardType === 1){
            boardType = "free";
        }else if(getBoardType === 2){
            boardType = "question";
        }

        navigate('/list-board/' + boardType);       
    };

    return (
        <div className='c-wwarp'>
            <div className="">
                <div className="create-board-wrrap">
                    <div className="">
                        <h3 className="">새글을 작성해주세요</h3>
                        <div className="">
                            <form>
                                <div className="">
                                    <label> Type </label>
                                    <select
                                        placeholder="typeNo"
                                        name="typeNo"
                                        className="form-control"
                                        value={state.board.typeNo}
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
                                        value={state.board.title}
                                        onChange={changeTitleHandler}
                                    />
                                </div>
                                <div className="">
                                    <label> Contents </label>
                                    <textarea
                                        placeholder="contents"
                                        name="contents"
                                        className="create-contents"
                                        value={state.board.contents}
                                        onChange={changeContentsHandler}
                                    />
                                </div>
                                <div className="">
                                    <label> UserId </label>
                                    <input
                                        placeholder="user_if"
                                        name="user_id"
                                        className="form-control"
                                        value={state.board.userId}
                                        onChange={changeMemberNoHandler}
                                    />
                                </div>
                                <button className="btn-success" onClick={createBoard}>
                                    Save
                                </button>
                                <button
                                    className=""
                                    onClick={goToBoard}
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
