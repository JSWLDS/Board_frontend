//import logo from './logo.svg';


import './App.css';
import './components/static/ListBoardComponentStyle.css';
import './components/static/CreateBoardComponentStyle.css';
import './components/static/ReadBoardComponentStyle.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import Main from './components/Main';
import HeaderComponent from './components/public/HeaderComponent';
import FooterComponent from './components/public/FooterComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import LoginComponent from './components/LoginComponent';


function App() {

  const freeBoard = 'freeBoard';
  const questionBoard = 'questionBoard';
  const allBoard = "allBoard";
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
              <Route path='/create-board'  element = {<CreateBoardComponent />}></Route>
              <Route path='/read-board/:boardId'  element = {<ReadBoardComponent />}></Route>
              <Route path='/login'  element = {<LoginComponent />}></Route>
            </Routes>
          </section>
        </div>
        <FooterComponent /> 
      </Router>
    </div>
  );
}

export default App;

