const progressReducer = (state=0,action) => {
    switch(action.type){
        case 'change': 
            return state=action.payload;
        
        default :
            return state;
    }
}


export default progressReducer