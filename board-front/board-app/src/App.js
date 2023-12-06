//import logo from './logo.svg';


import './App.css';
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
import Signup from './components/Signup';


function App() {

  const freeBoard = 'free';
  const questionBoard = 'question';
  const allBoard = "all";

  return (
    <div className='master-wrrap'>
      <Router>           
        <HeaderComponent/> 
        <div className='container'>
          <section>
            <Routes>       
              <Route path='/'  element = {<Main />}></Route>

              <Route path='/list-board/free'  element = {<ListBoardComponent type={freeBoard} />}></Route>
              <Route path='/list-board/question'  element = {<ListBoardComponent type={questionBoard} />}></Route>
              <Route path='/list-board/all'  element = {<ListBoardComponent type={allBoard} />}></Route>

              <Route path='/create-board/free'  element = {<CreateBoardComponent type={freeBoard} />}></Route>
              <Route path='/create-board/question'  element = {<CreateBoardComponent type={questionBoard} />}></Route>
              <Route path='/create-board/all'  element = {<CreateBoardComponent type={allBoard} />}></Route>


              <Route path='/read-board/:boardId'  element = {<ReadBoardComponent />}></Route>
              <Route path='/login'  element = {<LoginComponent />}></Route>
              <Route path='/signup'  element = {<Signup />}></Route>
            </Routes>
          </section>
        </div>
        <FooterComponent /> 
      </Router>
    </div>
  );
}

export default App;

