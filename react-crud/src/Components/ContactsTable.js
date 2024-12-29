import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://localhost:7092/api/Contacts/GetAll"
        );
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://localhost:7092/api/Contacts/RemoveContact/${id}`, {
        method: "DELETE",
      });
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container">
      <h1>Contact Records</h1>
      <div className="table-container">
        <Link to="/contact/create" className="button button-add">
          Add New Contact
        </Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Favorite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.favorite ? "Yes" : "No"}</td>
                  <td>
                    <Link
                      to={`/contact/view/${contact.id}`}
                      className="button button-info"
                    >
                      View
                    </Link>
                    <Link
                      to={`/contact/edit/${contact.id}`}
                      className="button button-primary"
                    >
                      Edit
                    </Link>
                    <button
                      className="button button-danger"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No contacts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;
