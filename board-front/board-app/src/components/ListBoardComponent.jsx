import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BoardService from '../Service/BoardService';
function ListBoardComponent(props) {
    const navigate = useNavigate(); 
    const [boards, setBoards] = useState([]);
    
    const boardType = props.type;
    
    console.log(boardType)

    useEffect(() => {
        
        let typeNo = 3;
        if(boardType === 'freeBoard'){
            typeNo = 1;
            console.log('test1')
        } else if(boardType === 'questionBoard'){
            typeNo = 2;
        } else if(boardType === 'allBoard'){
            typeNo = 0;
        }
        
        BoardService.getAllTypeBoards(typeNo).then((res) => {
            setBoards(res.data);
        });
        
        
    }, [boardType]);

    function createBoard(){
        navigate('/create-board');
    } 
    function readBoard(userId){
        BoardService.updateCount(userId)
        navigate(`/read-board/${userId}`);
    }

    return (
        <div className='listDivWrrap l-wrrap'>
            <div className='l-wrrap-se'>
                <h2 className="l-title">Boards List</h2>
                <div className="l-wrrap2">
                    <div className='l-header'>
                        <button className="create-btn" onClick={()=>{createBoard()}}>글 작성</button>
                    </div>
                    <table border={1} className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>글 제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>갱신일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boards.map(board => (
                                <tr key={board.boardId}>
                                    <td>{board.boardId}</td>
                                    <td onClick={()=> {readBoard(board.boardId)}}>{board.title}</td>
                                    <td>{board.userId}</td>
                                    <td>{board.createdTime}</td>
                                    <td>{board.updatedTime}</td>
                                    <td>{board.counts}</td>
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
