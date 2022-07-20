import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import { ReactSession } from 'react-client-session';

import {getUsers} from "../actions/users";
import Register from "./Register";
import Login from "./Login";
import Todo from "./Todo";

function App(){
    const dispatch = useDispatch();
    ReactSession.setStoreType("cookie");

    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch]);

    return (<Routes>
    <Route path = "/" element= {<Register />} />
    <Route path = "/login" element= {<Login />} />
    <Route path = "/todo" element= {<Todo />} />
    </Routes>);
}

export default App;