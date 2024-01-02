//import logo from './logo.svg';


import './App.css';
import React, { useState, useEffect } from 'react';

import './components/static/css/ListBoardComponentStyle.css';
import './components/static/css/CreateBoardComponentStyle.css';
import './components/static/css/ReadBoardComponentStyle.css';
import {BrowserRouter as Router, Route, Routes, useHref} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import Main from './components/Main'; 
import HeaderComponent from './components/public/HeaderComponent';
import FooterComponent from './components/public/FooterComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import MemberService from './Service/MemberService';
import loginChecker from './components/static/js/LoginChecker';
import { useNavigate } from 'react-router-dom'; 

function App() { 


  // let jwtToken = localStorage.getItem('Authorization') || '';
  // const jwtToken = useRef(localStorage.getItem('Authorization') || '');
  // const navigate = useNavigate();




  const menuList = ['free', 'question', 'all'];

  let jwtToken = (localStorage.getItem('Authorization') || '');

  const updateJwtToken = () => {
    return jwtToken = localStorage.getItem('Authorization') || '';
  };

  const [state, setState] = useState({
    memberId: 0,
    jwtToken: localStorage.getItem('Authorization') || ''
  });
  
  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const memId = await MemberService.getMemberId(state.jwtToken);
        setState(prevState => ({ ...prevState, memberId: memId }));
        setState(prevState =>  ({...prevState, jwtToken : updateJwtToken()}))
      } catch (error) {
        console.error('Error fetching member ID:', error);
      }
    };
  
    fetchMemberId();
  }, [state.jwtToken]);

  
  
  
  return (
    <div className='master-wrrap'>
      <Router>           
        <HeaderComponent/> 
        <div className='container'>
          <section>
            <Routes>       
              <Route path='/'  element = {<Main />}></Route>

              {menuList.map((type) => (
                <React.Fragment key={type}>
                  <Route path={`/list-board/${type}`} element={<ListBoardComponent type={type} jwt={jwtToken} />} />
                  <Route path={`/create-board/${type}`} element={<CreateBoardComponent type={type} jwt={jwtToken} memberId={state.memberId} />} />
                </React.Fragment>
              ))}

              <Route path='/read-board/:boardId'  element = {<ReadBoardComponent jwt={jwtToken} />}></Route>
              <Route path='/login'  element = {<LoginComponent />}></Route>
              <Route path='/signup'  element = {<SignupComponent />}></Route>
            </Routes>
          </section>
        </div>
        <FooterComponent /> 
      </Router>
    </div>
  );
}

export default App;

