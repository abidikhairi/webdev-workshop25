import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Collections() {
  const [x, setX] = useState("");
  const [collection, setCollection] = useState([]);

  /* ---------- Placeholder API Calls ---------- */

  const fetchCollections = async () => {
    // TODO: Replace with actual HTTP request
    console.log("Fetching collections...");
    return [
      { name: "Work", count: 99 },
      { name: "Errands", count: 3 },
    ];
  };

  const addCollectionRequest = async (newCollection) => {
    // TODO: Replace with actual HTTP request
    console.log("Adding collection:", newCollection);
    return { success: true };
  };

  const deleteCollectionRequest = async (index) => {
    // TODO: Replace with actual HTTP request
    console.log("Deleting collection at index:", index);
    return { success: true };
  };

  /* ---------- Lifecycle ---------- */
  useEffect(() => {
    const loadCollections = async () => {
      const data = await fetchCollections();
      setCollection(data);
    };
    loadCollections();
  }, []);

  /* ---------- Handlers ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (x.trim() === "") {
      alert("Collection name cannot be empty");
      return;
    }

    const newCollection = { name: x, count: 0 };
    const res = await addCollectionRequest(newCollection);

    if (res.success) {
      setCollection((prev) => [...prev, newCollection]);
      setX("");
    }
  };

  const handleDelete = async (index) => {
    const res = await deleteCollectionRequest(index);
    if (res.success) {
      setCollection((prev) => prev.filter((_, i) => i !== index));
    }
  };

  /* ---------- Render ---------- */
  return (
    <center>
      <h1>ToDo Collections</h1>

      <table className="highlight">
        <thead>
          <tr>
            <th>Collection name</th>
            <th>List count</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {collection.map((c, index) => (
            <tr key={index}>
              <td>
                <Link to={`/todo/${c.name}`}>{c.name}</Link>
              </td>
              <td>{c.count}</td>
              <td>
                <button
                  className="btn-floating btn-medium waves-effect waves-light red"
                  onClick={() => handleDelete(index)}
                >
                  <i class="large material-icons">delete_forever</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div class="input-field col s6">
            <input
              className="validate"
              id="collection_name"
              type="text"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
            <label for="collection_name">Collection name</label>
          </div>
          <div class="col s4">
            <button className="waves-effect waves-light btn" type="submit">
              Add collection
            </button>
          </div>
        </div>
      </form>
    </center>
  );
}

export default Collections;
