import axios from 'axios'; 
import axiosWithAuth from './AxiosSetHeaderService';

const BOARD_API_BASE_URL = "http://localhost:8080/api/v1/board"; 

class BoardService {
     

    getAllBoards() {
        return axiosWithAuth().get(BOARD_API_BASE_URL);
    }

    getAllTypeBoards(typeNo) {  
        if(typeNo === 0){
           return this.getAllBoards();
        }else{
            return axiosWithAuth().get(BOARD_API_BASE_URL + '/type/' + typeNo);
        }
       
    }

    createBoard(board) {
        return axiosWithAuth().post(BOARD_API_BASE_URL, board);
    }

    updateCount(boardId){
        return axiosWithAuth().patch(BOARD_API_BASE_URL + '/' + boardId);
    }
    
    getOneBoard(boardId){
        console.log(boardId+" getOneBoard입니다")
        return axiosWithAuth().get(BOARD_API_BASE_URL + '/' + boardId);
    }

}

const boardService =  new BoardService();

export default boardService;


