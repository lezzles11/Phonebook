import React from "react";
const PersonForm = ({
  addPerson,
  newName,
  nameChangeHandler,
  newPhone,
  phoneChangeHandler
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <p>
          {" "}
          Name: <input value={newName} onChange={nameChangeHandler} />
        </p>
        <p>
          {" "}
          Number: <input value={newPhone} onChange={phoneChangeHandler} />
        </p>
        <div>
          <button className="btn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default PersonForm;
