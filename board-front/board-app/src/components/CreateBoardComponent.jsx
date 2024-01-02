import React, { useEffect, useState } from 'react';
import BoardService from '../Service/BoardService';
import { useNavigate } from 'react-router-dom';
import TypeConverter from './static/js/TypeConverter';
import loginChecker from './static/js/LoginChecker';


function CreateBoardComponent(props) {

    
    const typeEng = props.type;
    let typeNo = TypeConverter.getType(typeEng)[0];
    const navigate = useNavigate();
    const jwtToken = props.jwt;
    const memberId = props.memberId;
    const [state, setState] = useState({
        board:{
            typeNo: typeEng === 'all'? 1 : typeNo ,
            title: '',
            contents: ''

        },
        
    });
        
    // useEffact를 사용하면 재로드 하기때문에 alert가 2번 실행된다. (가설)
    // 주석화 하니 1번만 실행됨.    
    // useEffect(()=>{
    //     const newJwtToken = localStorage.getItem('Authorization') || state.jwtToken;


  


    //     setState((prevState)=>({...prevState, jwtToken: newJwtToken}))
            

        
    // }, [state.jwtToken]);

    // 로그인 한사람만 게시글 작성 가능.
    if(!jwtToken){
        alert('로그인 해주십시오.')
        setTimeout(() => navigate('/login'), 100);   
        return;
    } else {

    }


    


    const handleChange = (event, field)=> {


        // 구조분해문법을 이용하여 생략해봄. (학습)
        // const {value} = event.target;
        let identifiedValue;
        if(typeof(event) === "object"){
            identifiedValue = event.target.value;
        }else{
            identifiedValue = event;
        }
        const value = identifiedValue;

        setState((prevState)=>({...state, board:{...prevState.board,  [field] : value }}));
    };


    const changeTypeHandler = (event) => {

        handleChange(event, "typeNo");
    
    };
    const changeTitleHandler = (event) => {
        handleChange(event, "title");
    };

    const changeContentsHandler = (event) => {
        // 게시글 최대 글자 수 설정.
        const maxLength = 5000;

        // 깔끔한 UI를 위한 자동 줄바꿈 글자 수.
        const lineLength = 71;
        const {value} = event.target;
        let contents="";
        if(value.length > maxLength){
            alert(`${maxLength}자 이하로 작성해주세요.`);
            // 현재는 state값이 아닌 textatrea의 value값을 가지고 온 것이다. state.contents.value의 값을 가지고 오면 에러가 난다. 
            // 문자열이 5000자가 아닌 데 혹은 없는 데 5000개로 자르려고 해서 에러가 난다.
            const maxLengthContents = value.slice(0, maxLength);
            contents = maxLengthContents;
        }
        else{
            contents = event;
        }
        // 보기 이쁘게 줄바꿈해서 저장함.
        if (value.length % lineLength === 0 && value.length !== 0){
            contents += "\n";

        }
        handleChange(contents, "contents");

    };


    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            typeNo: Number(state.board.typeNo),
            title: state.board.title,
            contents: state.board.contents,
            memberId: memberId.data
        };
        // console.log("----------------------------"+memberId)
        // console.log(memberId.data)

        BoardService.createBoard(board).then((res) => {
            goToBoard();
        });
    };

    const goToBoard = () => {

        navigate('/list-board/' + typeEng);       
    };  

   const returnSelected = () =>{

    const typeValue = state.board.typeNo;
    const typeKor = TypeConverter.getType(typeValue)[1];

    return (
        <p className='typeKorName'>{typeKor}</p>
    );

   };
   const returnSelect = () => {
    return (
        <select
            placeholder="typeNo"
            name="typeNo"
            className="typeKorName"
            value={state.board.typeNo}
            onChange={changeTypeHandler}
        >
            <option value="1">자유 게시판</option>
            <option value="2">질문과 답변 게시판</option>
        </select>
    );
   }

    return (
        <div className='c-wwarp'>
            <div className="">
                <div className="create-board-wrrap">
                    <div className="">
                        <h3 className="">새글을 작성해주세요</h3>
                        <div className="">
                            <form>
                                <div className="">
                                   
                                    <label> Type : {typeEng === "all" ? returnSelect() : returnSelected()}</label>
                                   
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
                                        id="contents"
                                        className="create-contents board-font"
                                        value={state.board.contents}
                                        onChange={changeContentsHandler}
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
