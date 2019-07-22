import React from "react";

const Person = ({ person, onClick }) => {
  return (
    <div>
     <li id={person.id}> 
     {person.name}{" "}{person.number} {" "}
     <button onClick={onClick}>Delete</button>
    </li>
    </div>
  )
}


export default Person;
