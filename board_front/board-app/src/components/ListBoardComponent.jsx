import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Navigation에서 제공하는 useNavigation 훅을 가져옵니다.
import BoardService from '../Service/BoardService';
function ListBoardComponent() {
    const navigate = useNavigate(); 
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        BoardService.getAllBoards().then((res) => {
            setBoards(res.data);
        });
    }, []);

    function createBoard(){
        navigate('/create-board');
    } 
    function readBoard(boardId){
        BoardService.updateCount(boardId)
        navigate(`/read-board/${boardId}`);
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
                                    <td>{board.memberId}</td>
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
