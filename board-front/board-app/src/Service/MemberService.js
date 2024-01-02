import axios from 'axios'; 
import axiosWithAuth from './AxiosSetHeaderService';

const MEMBER_API_BASE_URL ="http://localhost:8080/auth";


class MemberService {

    signMember(member) {
        return axiosWithAuth().post(MEMBER_API_BASE_URL+"/addNewUser", member);
    }
    loginMember(member) {
        return axiosWithAuth().post(MEMBER_API_BASE_URL+"/login", member)
    }
        
    getMemberId(jwt){
        console.log('Sending JWT:', jwt);
  
        return axiosWithAuth().get(MEMBER_API_BASE_URL+'/getMemberId/'+ jwt)
    }
}

const memberService =  new MemberService();

export default memberService;


