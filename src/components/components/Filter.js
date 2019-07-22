import React, { useState, useEffect } from "react";
  const Filter = ({ newFilter, filterChangeHandler }) => {
    return (
        <p>filter shown with
      <input value={newFilter} onChange={filterChangeHandler} />
     </p>
    )
}

export default Filter
