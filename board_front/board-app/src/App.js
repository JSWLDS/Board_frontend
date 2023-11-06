//import logo from './logo.svg';


import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import Main from './components/Main';
import HeaderComponent from './components/static/HeaderComponent';
import FooterComponent from './components/static/FooterComponent';
import ReadBoardComponent from './components/ReadBoardComponent';


function App() {
  return (
    <div>
      <Router>           
        <HeaderComponent/> 
        <div className='container'>
          <Routes>       
            <Route path='/'  element = {<Main />}></Route>
            <Route path='/list-board'  element = {<ListBoardComponent />}></Route>
            <Route path='/create-board'  element = {<CreateBoardComponent />}></Route>
            <Route path='/read-board/:boardId'  element = {<ReadBoardComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent /> 
      </Router>
    </div>
  );
}

export default App;

