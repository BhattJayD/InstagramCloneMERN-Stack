export const initialState=null;
export const recucer=(state,action)=>{
    if (action.type=="USER") {
        return action.payload
    }
    if (action.type=="CLEAR") {
        return null
    }
    return state
}