export const setProgress = (progress) =>{
    return (dispatch)=>{
        dispatch({
            type: 'change',
            payload: progress
        })
    }
}
