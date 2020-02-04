import React from "react";
const Persons = props => {
	return props.persons.map(p => (
		<div key={p.name}>
			{p.name} {p.number}{" "}
			<button onClick={() => props.deletePerson(p.id)}>Delete</button>
		</div>
	));
};

export default Persons;
