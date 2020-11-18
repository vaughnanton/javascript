import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function Note(props) {
  
  function handleClick() {
    props.onDelete(props.cid);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <input type="hidden" name="cid" value={props.cid} />
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
