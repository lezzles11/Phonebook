import React from "react";

const Person = ({ person, del }) => {
	return (
		<div className="card">
			<div className="card-body">
				Name: {person.name} <br />
				Number: {person.number}
				<br />
				<button className="btn" onClick={del}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Person;
