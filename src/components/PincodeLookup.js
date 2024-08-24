import React, { useState } from "react";
import Loader from "./Loader";
import PostOfficeList from "./PostOfficeList";
import "../styles.css";

const PincodeLookup = () => {
  const [pincode, setPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  const handleLookup = async (e) => {
    e.preventDefault();

    if (pincode.length !== 6 || isNaN(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setError("");
    setLoading(true);
    setPostOffices([]);

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      setLoading(false);

      if (data[0].Status !== "Success") {
        setError("Could not retrieve data. Please try a different pincode.");
        return;
      }

      const offices = data[0].PostOffice;
      if (offices.length === 0) {
        setError("No data found for the given pincode.");
      } else {
        setPostOffices(offices);
      }
    } catch (error) {
      setLoading(false);
      setError(
        "An error occurred while fetching the data. Please try again later."
      );
    }
  };

  return (
    <div className="container">
      <h1>Pincode Lookup</h1>
      <form onSubmit={handleLookup}>
        <input
          type="text"
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button type="submit">Lookup</button>
      </form>

      {error && <div className="errorMessage">{error}</div>}

      {loading && <Loader />}

      {!loading && postOffices.length > 0 && (
        <>
          <div className="filterSection">
            <input
              type="text"
              placeholder="Filter by post office name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <PostOfficeList postOffices={postOffices} filter={filter} />
        </>
      )}
    </div>
  );
};

export default PincodeLookup;
