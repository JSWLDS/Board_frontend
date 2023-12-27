//import logo from './logo.svg';


import './App.css';
import React, { useEffect, useRef } from 'react';
import './components/static/css/ListBoardComponentStyle.css';
import './components/static/css/CreateBoardComponentStyle.css';
import './components/static/css/ReadBoardComponentStyle.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import Main from './components/Main'; 
import HeaderComponent from './components/public/HeaderComponent';
import FooterComponent from './components/public/FooterComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import loginChecker from './components/static/js/LoginChecker';
import { useNavigate } from 'react-router-dom'; 

function App() { 


  // let jwtToken = localStorage.getItem('Authorization') || '';
  // const jwtToken = useRef(localStorage.getItem('Authorization') || '');
  const navigate = useNavigate();

  const menuList = ['free', 'question', 'all'];

  const jwtToken = useRef(localStorage.getItem('Authorization') || '');

  const updateJwtToken = () => {
    jwtToken.current = localStorage.getItem('Authorization') || '';
  };

  useEffect(() => {
    updateJwtToken();
  }, [jwtToken]);

  
  if (!jwtToken) {
    alert('로그인 해주십시오.');
    // navigate('/login')
    setTimeout(() => navigate('/login'), 100);
    return true;
  }

  
  
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
                  <Route path={`/create-board/${type}`} element={<CreateBoardComponent type={type} jwt={jwtToken} />} />
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

