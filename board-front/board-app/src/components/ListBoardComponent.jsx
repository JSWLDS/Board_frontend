import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BoardService from '../Service/BoardService';
function ListBoardComponent(props) {
    const navigate = useNavigate(); 
    const [state, setState] = useState({
        boards : [],
        title : ""
    });
    
    const boardType = props.type;


    useEffect(() => {

        const identifiedType = typeConverter(boardType);
        
        const typeNo = identifiedType[0];
        const typeName = identifiedType[1];

        console.log(identifiedType[1])
        BoardService.getAllTypeBoards(typeNo).then((res) => {
            setState(state => ({...state, boards :res.data}));
        });
        setState(state => ({...state, title : typeName}));

        
    }, [boardType]);


    function createBoard(){
        navigate('/create-board');
    } 
    function readBoard(boardId){
        BoardService.updateCount(boardId)
        navigate(`/read-board/${boardId}`);
    }
    function getBoardTitle(){
        const boardTypeName = state.title;
        return boardTypeName;
    }

    function typeConverter(boardTypeEn){
        let boardTypeNo = 0;
        let boardTypeKor = "";

        if(boardTypeEn === 'freeBoard' || boardTypeEn === 1){
            boardTypeNo = 1;
            boardTypeKor = "자유 게시판";
        } else if(boardTypeEn === 'questionBoard'|| boardTypeEn ===2){
            boardTypeNo = 2;
            boardTypeKor = "질문과 답변 게시판";
        } else if(boardTypeEn === 'allBoard'){
            boardTypeNo = 0;
            boardTypeKor = "전체 게시판";
        } else {
            boardTypeNo = 3;
            boardTypeKor = "타입 미지정";
        }
        return [boardTypeNo, boardTypeKor];
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
                                    <td>{typeConverter(board.typeNo)[1]}</td>
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
