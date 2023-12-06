import axios from 'axios'; 


const API_BASE_URL ="http://localhost:8080/api/v1";
const MEMBER_API_BASE_URL ="http://localhost:8080/auth";
const BOARD_API_BASE_URL = "http://localhost:8080/api/v1/board"; 

class BoardService {
     
    getAllBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }

    getAllTypeBoards(typeNo) {
        if(typeNo === 0){
           return this.getAllBoards();
        }else{
            return axios.get(BOARD_API_BASE_URL + '/type/' + typeNo);
        }
       
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    createMember(member) {
        return axios.post(MEMBER_API_BASE_URL+"/addNewUser", member);
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


