import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BoardService from '../Service/BoardService';
import PublicHandler from './static/js/PublicHandler';
function ListBoardComponent(props) {

    const navigate = useNavigate(); 
    const [state, setState] = useState({
        boards : [],
        subjectKor : "",
        subjectEng : ""
    });
        
        const boardType = props.type;


    useEffect(() => {

        const identifiedType = PublicHandler.getType(boardType);
        
        const typeNo = identifiedType[0];
        const typeNameKor = identifiedType[1];
        const typeNameEng = identifiedType[2];

        BoardService.getAllTypeBoards(typeNo).then((res) => {
            setState(state => ({...state, boards :res.data}));
        });

        setState(state => ({...state, subjectKor : typeNameKor}));

        setState(state => ({...state, subjectEng : typeNameEng}));

    }, [boardType]);


    function createBoard(){
        navigate(`/create-board/${state.subjectEng}`);
    } 
    function readBoard(boardId){
        BoardService.updateCount(boardId)
        navigate(`/read-board/${boardId}`);
    }
    function getBoardTitle(){
        const boardTypeName = state.subjectKor;
        return boardTypeName;
    }




    return (
        <div className='listDivWrrap l-wrrap'>
            <div className='l-wrrap-se'>
                <h2 className="l-title">{getBoardTitle()}</h2>
                <div className="l-wrrap2">
                    <div className='l-header'>
                        <button className="create-btn" onClick={createBoard}>글 작성</button>
                    </div>
                    <table border={1} className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>글 제목</th>
                                <th>작성자</th>
                                <th>타입</th>
                                <th>작성일</th>
                                <th>갱신일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.boards.map(board => (                                <tr key={board.boardId}>
                                    <td>{board.boardId}</td>
                                    <td onClick={()=> {readBoard(board.boardId)}}>{board.title}</td>
                                    <td>{board.userId}</td>
                                    <td>{PublicHandler.getType(board.typeNo)[1]}</td>
                                    <td>{board.createdTime}</td>
                                    <td>{board.updatedTime}</td>
                                    <td>{board.counts}</td>
                                    {console.log(board)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListBoardComponent;
