import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Collections() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [x, setX] = useState("");
  const [collection, setCollection] = useState([]);

  /* ---------- Placeholder API Calls ---------- */

  const fetchCollections = async () => {
    const res = await fetch(`${apiUrl}/api/project`);
    if (!res.ok) throw new Error("Failed to fetch collections");
    return res.json();
  };

  const addCollectionRequest = async (newCollection) => {
    try {
      const response = await fetch(`${apiUrl}/api/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCollection),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Project added:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Error adding project:", error);
      return { success: false, error };
    }
  };

  const deleteCollectionRequest = async (collectionId) => {
    try {
      const response = await fetch(`${apiUrl}/api/project/${collectionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // include cookies/auth if needed
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Collection deleted:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Error deleting collection:", error);
      return { success: false, error };
    }
  };
  /* 
  const deleteCollectionRequest = async (index) => {
    // TODO: Replace with actual HTTP request
    console.log("Deleting collection at index:", index);
    return { success: true };
  }; */

  /* ---------- Lifecycle ---------- */
  useEffect(() => {
    console.log(apiUrl);
    const loadCollections = async () => {
      const data = await fetchCollections();

      console.log(data.projects);
      setCollection(data.projects);
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

  const handleDelete = async (projectId) => {
    const res = await deleteCollectionRequest(projectId);
    if (res.success) {
      setCollection((prev) =>
        prev.filter((project) => project.id !== projectId)
      );
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
              <td>{index + 1}</td>
              <td>
                <Link to={`/todo/${c.id}`}>{c.name}</Link>
              </td>
              <td>{c.todos?.length || 0}</td>
              <td>
                <button
                  className="btn-floating btn-medium waves-effect waves-light red"
                  onClick={() => handleDelete(c.id)}
                >
                  <i className="large material-icons">delete_forever</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input
              className="validate"
              id="collection_name"
              type="text"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
            <label htmlFor="collection_name">Collection name</label>
          </div>
          <div className="col s4">
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
