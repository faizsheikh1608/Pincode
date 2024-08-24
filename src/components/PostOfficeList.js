import React from "react";

const PostOfficeList = ({ postOffices, filter }) => {
  const filteredOffices = postOffices.filter((office) =>
    office.Name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredOffices.length === 0) {
    return <p>Couldn’t find the postal data you’re looking for…</p>;
  }

  return (
    <div className="results">
      {filteredOffices.map((office) => (
        <div key={office.Name} className="post-office">
          <strong>Post Office Name:</strong> {office.Name}
          <br />
          <strong>Pincode:</strong> {office.Pincode}
          <br />
          <strong>District:</strong> {office.District}
          <br />
          <strong>State:</strong> {office.State}
        </div>
      ))}
    </div>
  );
};

export default PostOfficeList;
