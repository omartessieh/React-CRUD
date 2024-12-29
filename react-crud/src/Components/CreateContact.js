import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateContact = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    favorite: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContact({
      ...contact,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7092/api/Contacts/AddContact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
            className="form-control"
            title="Phone number should be in the format 03-123-456"
            placeholder="03-123-456"
            pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="favorite"
              checked={contact.favorite}
              onChange={handleChange}
              className="form-check-input"
            />
            Favorite
          </label>
        </div>
        <button type="submit" className="button button-primary">
          Add Contact
        </button>
        <Link to="/" className="button button-primary">
          Back to Contacts
        </Link>
      </form>
      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
};

export default CreateContact;
