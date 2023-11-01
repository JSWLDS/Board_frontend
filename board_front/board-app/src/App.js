//import logo from './logo.svg';
// #1

import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import Main from './components//Main';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

// #2
function App() {
  return (
    <div>
      <Router>            {/* #3 */}
        <HeaderComponent/>  {/* #4 */}
        <div className='container'>
          <Routes>        {/* #5 */}
            <Route path='/'  element = {<Main />}></Route>
            <Route path='/list-board'  element = {<ListBoardComponent />}></Route>
            <Route path='/create-board'  element = {<CreateBoardComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />   {/* #6 */}
      </Router>
    </div>
  );
}

export default App;

