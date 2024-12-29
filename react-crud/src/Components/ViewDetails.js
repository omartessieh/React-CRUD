import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ViewDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `https://localhost:7092/api/Contacts/GetContactById/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contact details");
        }
        const data = await response.json();
        setContact(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h2>Contact Details</h2>
      <div className="details-card">
        <p>
          <strong>ID:</strong> {contact.id}
        </p>
        <p>
          <strong>Name:</strong> {contact.name}
        </p>
        <p>
          <strong>Email:</strong> {contact.email}
        </p>
        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>
        <p>
          <strong>Favorite:</strong> {contact.favorite ? "Yes" : "No"}
        </p>
      </div>
      <Link to="/" className="button button-primary">
        Back to Contacts
      </Link>
    </div>
  );
};

export default ViewDetails;
