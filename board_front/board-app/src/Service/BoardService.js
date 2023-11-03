import axios from 'axios'; 



const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; 

class BoardService {

    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }
    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }
    getOneBoard(id){
        console.log(id+" getOneBoard입니다")
        return axios.get(BOARD_API_BASE_URL + '/' + id);
    }
}

const boardService =  new BoardService();

export default boardService;


