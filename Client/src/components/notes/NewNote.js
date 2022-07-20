import React from "react";

function NewNote(props){
    const [note, setNote] = React.useState({
        title: "",
        content: ""
    });

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setNote((prevValue) =>{
            return{
                ...prevValue,
                [name]: value
            };
        })
    }
    return(
        <form onSubmit={(event)=>{
            event.preventDefault()
             setNote({
                title: "",
                content: ""
            })
            props.handleSubmit(note);
        }}>
            <input name = "title" type = "text" placeholder="Title" onChange={handleChange} value={note.title}></input>
            <input name = "content" type = "text" placeholder="Take a note..." onChange={handleChange} value={note.content}></input>
            <button type="submit">Add</button>
        </form>
    )

}

export default NewNote;