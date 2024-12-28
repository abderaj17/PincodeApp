import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPincodeDetails } from "../redux/pincodeSlice";

const PincodeLookup = () => {
  const [pincode, setPincode] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.pincode);

  const handleLookup = () => {
    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }
    dispatch(fetchPincodeDetails(pincode));
  };

  const filteredData = data.filter((office) =>
    office.Name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Pincode Lookup</h1>
      <input
        type="text"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        style={{ padding: "10px", width: "100%" }}
      />
      <button onClick={handleLookup} style={{ marginTop: "10px" }}>
        Lookup
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && data.length > 0 && (
        <>
          <h2>Pincode: {pincode}</h2>
          <input
            type="text"
            placeholder="Filter by Post Office Name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "10px", width: "100%", margin: "10px 0" }}
          />
          <div>
            {filteredData.length > 0 ? (
              filteredData.map((office, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid black",
                    margin: "10px 0",
                    padding: "10px",
                  }}
                >
                  <p>
                    <strong>Name:</strong> {office.Name}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {office.Pincode}
                  </p>
                  <p>
                    <strong>District:</strong> {office.District}
                  </p>
                  <p>
                    <strong>State:</strong> {office.State}
                  </p>
                </div>
              ))
            ) : (
              <p>Couldn’t find the postal data you’re looking for...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PincodeLookup;
