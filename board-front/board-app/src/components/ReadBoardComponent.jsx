import React, { useState, useEffect } from 'react';
import BoardService from '../Service/BoardService';
import { useNavigate, useParams } from 'react-router-dom';
import viewIcon from './public/img/icon-veiw.png';
import loginChecker from './static/js/LoginChecker';

function ReadBoardComponent(props) {

    const {boardId} = useParams();
    const navigate = useNavigate(); 
    const jwtToken = props.jwt;

    const [state, setState] = useState({
        board: {},
        edited : ""
        });
    
    // loginChecker.jwtCheck(jwtToken, navigate);
    
    useEffect(() => {

        BoardService.getOneBoard(boardId).then( (res) => {
            setState({board: res.data});
        });

    }, [boardId]);


    if(!jwtToken){
        alert('로그인 해주십시요.')
        setTimeout(() => navigate('/login'), 100);   
        return;
    }

    

 
    
    function returnBoardType(typeNo){
        let type = null;
        if (typeNo === 1) {
            type = "자유게시판";

        } else if (typeNo === 2 ) {
            type = "질문과 답변 게시판";

        } else {
            type = "타입 미지정";
        }

        return (
            <div className = "read-board-type-wrrap">
                <label className='read-board-type'>{type}</label> 
            </div>
        )

    }

    
    function returnCounts(counts){                                                                                             
        return (
            <div className='read-board-counts'>
                <div className='r-label-cover'><label><img src={viewIcon} alt='error' className='icon-view'/><p>{counts}</p></label></div>
            </div>
        )
    }

    function returnDate(cTime, uTime){
        
        const createdDateTime = new Date(cTime);
        // long은 11월, short, numberic은 11 이런식으로 표현됨.
        const formattedDate = createdDateTime.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'numeric', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric', // 초는생략함.
            hour12: false // AM/PM 적용 여부
        });

        if(cTime !== uTime){
           setState({...state, edited:'(수정됨)'});
        }

        return (
            <div className='read-board-date'>
                <p> {formattedDate}{state.edited}</p>
            </div>
        )
    }
    
    function returnContent(contents){
        return (
            <div className='read-board-contents'>
                <pre className = "board-font">
                    {contents}
                </pre>
            </div>
        )
    }

    function returnTitle(title){
        return (
            <div className ="read-board-title">
                <p>{title}</p>
            </div>
        )
    }
    
    function returnUser(memberId){
        return (
           
            <div className = "read-userId">
                <p>{memberId} 님</p>
            </div>
        )
    }
    function goToList() {
        navigate('/list-board');
    }

    return (
        <div className="read-board-wrrap">
            <div className = "read-section">
                <div className = "read-body">
                    <div className='read-header'>
                        <div className='r_h_grid_1'>
                            {returnTitle(state.board.title)}
                        </div>
                        <div className='r_h_grid_2'>
                            <div className='temp-div_1 temp1_src1'>
                                {returnUser(state.board.memberId)}
                                <p>•</p>
                                {returnDate(state.board.createdTime, state.board.updatedTime) } 
                            </div>
                            <div className='board-type-count temp-div_1 temp1_src2'>
                                {returnBoardType(state.board.typeNo)} 
                                <p>•</p>
                                {returnCounts(state.board.counts)}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/* <br/> */}   
                   {returnContent(state.board.contents)}
                    <div className='contents-end-line'><hr/></div>
                    <div className='comment-line'><div><hr /></div></div>


                        
                        <button className="btn btn-primary" onClick={()=>{goToList()}} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                </div>
            </div>

        </div>
    );
}
export default ReadBoardComponent;