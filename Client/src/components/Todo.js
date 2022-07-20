import React, { useState, useEffect} from "react";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {ReactSession} from "react-client-session";

import Header from "./notes/Header";
import NewNote from "./notes/NewNote";
import Note from "./notes/Note";

function Todo(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        try {
            setUser(ReactSession.get("username"));
            try {
                fetch("http://localhost:5000/api/" + user).then((response) => response.json()).then((json) => setNotes(json));
                
            } catch (error) {
                console.log(error);
            }
         } catch (error) {
             navigate("/login");
         }},[navigate,user,notes]);

    function createNewNote(note){
        setNotes((prevValue) => {
            return [...prevValue, note];
        });
        fetch("http://localhost:5000/api/" + user, {
        method: 'PATCH',
        body: JSON.stringify({
            items: [...notes,note],
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));}

    function deleteNote(id, _id){
        setNotes((prevNotes) => {
            return prevNotes.filter((item,index) =>{
                return index !== id;
            });
        });
        fetch("http://localhost:5000/api/" + user + "/" + _id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
  },
}).then((response) => response.json()).then((json) => console.log(json));
    }
    return(user === "" ? navigate("/login") :
     <div>
     <Header/>
     <NewNote handleSubmit = {createNewNote}/>
     {notes.map((note,index) =><Note key = {index} title = {note.title} content = {note.content} handleClick={deleteNote} id = {note._id} index = {index}/>)}
    </div>);

   
}

export default Todo;