import axios from "axios";

const url = "http://localhost:5000/api/";

function fetchUsers(){
    return axios.get(url + "users");
}

function createUser(newUser){
    return axios.post(url + "users",newUser);
}

function fetchUser(user){
    return axios.post(url + "user", user);
}



export {fetchUsers, createUser, fetchUser};