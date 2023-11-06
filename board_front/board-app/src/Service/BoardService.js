import axios from 'axios'; 



const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; 

class BoardService {

    

    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }
    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }
    updateCount(boardId){
        return axios.patch(BOARD_API_BASE_URL + '/' + boardId);
    }
    getOneBoard(boardId){
        console.log(boardId+" getOneBoard입니다")
        return axios.get(BOARD_API_BASE_URL + '/' + boardId);
    }
}

const boardService =  new BoardService();

export default boardService;


