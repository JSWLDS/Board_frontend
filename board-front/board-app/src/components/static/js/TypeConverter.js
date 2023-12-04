
class TypeConverter {
    getType(target){
        let boardTypeNo = 0;
        let boardTypeKor = "";
        let boardTypeEn = "";

        if(target === 'free' || target === 1){
            boardTypeNo = 1;
            boardTypeKor = "자유 게시판";
            boardTypeEn = "free";
        } else if(target === 'question'|| target === 2){
            boardTypeNo = 2;
            boardTypeKor = "질문과 답변 게시판";
            boardTypeEn = "question";
        } else if(target === 'all' || target === 0){
            boardTypeNo = 0;
            boardTypeKor = "전체 게시판";
            boardTypeEn = "all";
        } else {
            boardTypeNo = 3;
            boardTypeKor = "타입 미지정";
            boardTypeEn = "";
        }
        return [boardTypeNo, boardTypeKor, boardTypeEn];
    }
}




const typeConverter =  new TypeConverter();

export default typeConverter;