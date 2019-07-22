import React, { useState, useEffect } from "react";
  const PersonForm = ({ addPerson, newName, nameChangeHandler, newNumber, numberChangeHandler}) => {
    return (
        <div> 
        <form onSubmit={addPerson}>
        <p> Name: <input value={newName} onChange={nameChangeHandler} /></p>
        <p> Number: <input value={newNumber} onChange={numberChangeHandler} /></p> 
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      </div>
    )
}
export default PersonForm