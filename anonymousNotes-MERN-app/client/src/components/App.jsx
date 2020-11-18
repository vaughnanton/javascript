import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const axios = require('axios').default;
  const [notes, setNotes] = useState([]);
  const [serverNotes, setServerNotes]  = useState([]);
  let serverResponse = [];

  useEffect(() => { 
    axios.get('/grab').then((res) => {
      if (res.data.length !== 0) {
        serverResponse = res.data;
        updateArray();
      } else {
        console.log('server empty, no notes')
      }
    })
  }, [])

  function updateArray() {
    setServerNotes(serverResponse) 
  }

  function addNote(newNote) {

    if (newNote.title.length >= 1 && newNote.content.length >= 1) {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
  
      axios.post('/', newNote).then((res) => {
                  console.log(res)
              }).catch((error) => {
                  console.log(error)
              });
    }
    
  }

  function deleteNote(id) {

    console.log('this then ciidd')
    console.log(this)
    console.log(id)

    axios.post('/delete', {noteToDelete: id}).then((res) => {
      console.log(res)
    }).catch((error) => {
        console.log(error)
    });

    // setServerNotes(serverNotes.filter(note => note.title !== this.title));
    // setNotes(notes.filter(note => note.title !== this.title));

    setServerNotes(serverNotes.filter(note => note.cid !== this.cid));
    setNotes(notes.filter(note => note.cid !== this.cid));

  }

  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };

  // test get
  // const hitBackend = () => {
  //   axios.get('/test')
  //   .then((res) => {
  //   console.log(res.data)
  //   })
  // }

  return (
    <div>
      <Header />
      {/* trigger test post, will be removed */}
      {/* <button onClick={hitBackend}>Send request</button> */}

      <CreateArea onAdd={addNote} />

      {serverNotes.map((serverItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            cid={serverItem.cid}
            title={truncate(serverItem.title, 10)}
            content={truncate(serverItem.content, 60)}
            onDelete={deleteNote}
          />
        );
      })}

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            cid={noteItem.cid}
            title={truncate(noteItem.title, 10)}
            content={truncate(noteItem.content, 40)}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
