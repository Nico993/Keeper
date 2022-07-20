import * as api from "../api";

// Action Creators
const getUsers = () => async (dispatch) => {
    try {
        const {data} = await api.fetchUsers();
        dispatch({type: "FETCH_ALL", payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

const createUser = (user) => async (dispatch) =>{
    try {
        const {data} = await api.createUser(user);
        
        dispatch({type: "CREATE", payload: data});
    } catch (error) {   
        return error.message;
    }
}

const getUser = (user) => async (dispatch) =>{
    try{
        const {data} = await api.fetchUser(user);

        dispatch({type: "FETCH_ONE", payload: data});
    }catch(error){
        return error.message;
    }
}


export {getUsers, createUser, getUser};
