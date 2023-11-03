import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Navigation에서 제공하는 useNavigation 훅을 가져옵니다.
import BoardService from '../Service/BoardService';

function ListBoardComponent() {
    const navigate = useNavigate(); 
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        BoardService.getBoards().then((res) => {
            setBoards(res.data);
        });
    }, []);

    function createBoard(){
        navigate('/create-board');
    } 
    function readBoard(id){
        navigate(`/read-board/${id}`);
    }

    return (
        <div className='listDivWrrap'>
            <h2 className="text-center">Boards List</h2>
            <button className="btn btn-primary" onClick={()=>{createBoard()}}>글 작성</button>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>타이틀</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>갱신일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.map(board => (
                            <tr key={board.id}>
                                <td>{board.id}</td>
                                <td><a onClick={()=> {readBoard(board.id)}}>{board.title}</a></td>
                                <td>{board.memberNo}</td>
                                <td>{board.createdTime}</td>
                                <td>{board.updatedTime}</td>
                                <td>{board.counts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListBoardComponent;
