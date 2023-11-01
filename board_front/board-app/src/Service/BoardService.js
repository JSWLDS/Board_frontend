import axios from 'axios'; 



const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; 

class BoardService {

    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }
    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }
}

const boardService =  new BoardService();

export default boardService;


