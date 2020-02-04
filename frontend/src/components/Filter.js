import React from "react";

const Filter = props => {
	return (
		<div>
			Find Person
			<input onChange={props.handleChange} value={props.value} />
		</div>
	);
};

export default Filter;
