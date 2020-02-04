import React from "react";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    deleteHandler() {
        var id = parseInt(this.props.id);
        this.props.removeContact(id);
    }
    render() {
        return (
            <div id={this.props.id}>
                <label>Name: </label> {this.props.name} <br />
                <label> Number: </label> {this.props.number} <br />
                <button onClick={this.deleteHandler}>Delete</button>
            </div>
        );
    }
}

const contacts = [
    { id: 0, name: "lesley", number: 34444 },
    { id: 1, name: "robert", number: 33234 }
];

class ContactList extends React.Component {
    render() {
        const listContacts = this.props.contacts.map(contact => (
            <div>
                <br />
                <Contact
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    number={contact.number}
                    removeContact={this.props.removeContact}
                />
            </div>
        ));
        return <div>{listContacts}</div>;
    }
}

export default class PhonebookApp extends React.Component {
    constructor(props) {
        super(props);
        this.addContact = this.addContact.bind(this);
        this.removeContact = this.removeContact.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.state = {
            contacts: contacts,
            newName: "",
            newNumber: ""
        };
    }
    handleNameChange(e) {
        this.setState({
            newName: e.target.value
        });
    }
    handleNumberChange(e) {
        this.setState({
            newNumber: e.target.value
        });
    }
    addContact(e) {
        e.preventDefault();
        let contactName = this.state.newName;
        let contactNumber = this.state.newContact;
        contacts.unshift({
            id: contacts.length + 1,
            key: contacts.length + 1,
            name: contactName,
            number: contactNumber
        });
        this.setState({
            contacts: contacts
        });
    }
    removeContact(id) {
        contacts.splice(id, 1);
        this.setState({
            contacts: contacts
        });
    }
    render() {
        return (
            <div>
                <h2>Phonebook </h2>
                <form onSubmit={this.addContact}>
                    <input
                        type="text"
                        onChange={this.handleNameChange}
                        value={this.state.newName}
                    />
                    <br />
                    <input
                        type="text"
                        onChange={this.handleNumberChange}
                        value={this.state.newNumber}
                    />
                    <br />
                    <button type="submit">Add Contact</button>
                </form>
                <br />
                <div>
                    <h3> Contact List</h3>
                    <ContactList
                        contacts={contacts}
                        removeContact={this.removeContact()}
                    />
                </div>
            </div>
        );
    }
}
