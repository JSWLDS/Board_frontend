import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BoardService from '../Service/BoardService';
import TypeConverter from '../components/static/js/TypeConverter';
function ListBoardComponent(props) {

    const navigate = useNavigate(); 
    const [state, setState] = useState({
        boards : [],
        subjectKor : "",
        subjectEng : ""
    });
        
    const boardType = props.type;
    const jwtToken = props.jwt;

    useEffect(() => {

        const identifiedType = TypeConverter.getType(boardType);
        
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


        if (!jwtToken) {
            alert('로그인 해주십시오.');
            // navigate('/login')
            setTimeout(() => navigate('/login'), 100);
            return true;
          }


        BoardService.updateCount(boardId)
        // 시간을 안 기다리고 바로 navigate를 실행하면 카운트가 안세진 숫자로 read에서 표시되는 경우가 있음.
        setTimeout(() =>   navigate(`/read-board/${boardId}`), 100);
        // navigate(`/read-board/${boardId}`);
    }
    function getBoardTitle(){ 
        const boardTypeName = state.subjectKor;
        return boardTypeName;
    }

    function getAllTypeBoards(){  
        return (
            state.boards.map(board => (                                
            <tr key={board.boardId}>
                <td>{board.boardId}</td>
                <td onClick={()=> {readBoard(board.boardId)}}>{board.title}</td>
                <td>{board.userId}</td>
                <td>{TypeConverter.getType(board.typeNo)[1]}</td>
                <td>{board.createdTime}</td>
                <td>{board.updatedTime}</td>
                <td>{board.counts}</td>
                {console.log(board)}
            </tr>
            ))
        );
    }



    return (
        <div className='listDivWrrap l-wrrap'>
            <div className='l-wrrap-se'>
                <h2 className="l-title">{getBoardTitle()}</h2>
                <div className="l-wrrap2">
                    <div className='l-header'>
                        <button className="create-btn" onClick={createBoard}>글 작성</button>
                    </div>
                    <table border={1} className="table">
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
                          {getAllTypeBoards()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListBoardComponent;
