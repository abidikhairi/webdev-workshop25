import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import imgInProg from "../assets/resized/InProgress.jpg";
import imgPend from "../assets/resized/Pending.jpg";
import imgComp from "../assets/resized/Complete.jpg";
import imgPaus from "../assets/resized/Paused.jpg";

function Todos() {
  const { name } = useParams();

  const ALL_STATUSES = ["In progress", "Completed", "Pending", "Paused"];

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  /* ---------- Placeholder API Calls ---------- */

  // Fetch todos from server
  const fetchTodos = async () => {
    // TODO: Replace with actual HTTP request
    console.log("Fetching todos for collection:", name);
    return [
      {
        name: "Create todo component",
        status: "In progress",
        createdAt: "2025-06-01",
        modifiedAt: "2025-06-02",
      },
      {
        name: "Add routes",
        status: "Completed",
        createdAt: "2025-06-01",
        modifiedAt: "2025-06-02",
      },
    ];
  };

  // Add a new todo to server
  const addTodoRequest = async (todo) => {
    // TODO: Replace with actual HTTP request
    console.log("Adding todo:", todo);
    return { success: true };
  };

  // Delete a todo from server
  const deleteTodoRequest = async (index) => {
    // TODO: Replace with actual HTTP request
    console.log("Deleting todo at index:", index);
    return { success: true };
  };

  // Update todo status on server
  const updateTodoStatusRequest = async (index, newStatus) => {
    // TODO: Replace with actual HTTP request
    console.log(`Updating todo ${index} to status: ${newStatus}`);
    return { success: true };
  };

  /* ---------- State ---------- */
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoStatus, setNewTodoStatus] = useState("In progress");

  /* ---------- Lifecycle ---------- */
  useEffect(() => {
    // Fetch initial todos when component mounts
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  }, [name]);

  /* ---------- Helpers ---------- */
  const statusImage = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return imgInProg;
      case "completed":
        return imgComp;
      case "pending":
        return imgPend;
      case "paused":
        return imgPaus;
      default:
        return imgInProg;
    }
  };

  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "blue lighten-4";
      case "completed":
        return "green lighten-4";
      case "pending":
        return "orange lighten-4";
      case "paused":
        return "grey lighten-3";
      default:
        return "";
    }
  };

  const statusButtonColor = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "blue";
      case "completed":
        return "green";
      case "pending":
        return "orange";
      case "paused":
        return "grey";
      default:
        return "blue";
    }
  };

  /* ---------- Actions ---------- */
  const updateStatus = async (index, newStatus) => {
    const today = new Date().toISOString().split("T")[0];
    const res = await updateTodoStatusRequest(index, newStatus);
    if (res.success) {
      setTodos((prev) =>
        prev.map((todo, i) =>
          i === index ? { ...todo, status: newStatus, modifiedAt: today } : todo
        )
      );
    }
  };

  const deleteTodo = async (index) => {
    const res = await deleteTodoRequest(index);
    if (res.success) {
      setTodos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoName.trim()) return;

    const today = new Date().toISOString().split("T")[0];
    const newTodo = {
      name: newTodoName,
      status: newTodoStatus,
      createdAt: today,
      modifiedAt: today,
    };

    const res = await addTodoRequest(newTodo);
    if (res.success) {
      setTodos((prev) => [...prev, newTodo]);
      setNewTodoName("");
      setNewTodoStatus("In progress");
    }
  };

  /* ---------- Utility ---------- */
  const chunkTodos = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const todoRows = chunkTodos(todos, 4);

  /* ---------- Render ---------- */
  return (
    <div>
      <h1>Todos: {name}</h1>
      <Link to={`/`} className="btn blue">
        ← Collections
      </Link>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo}>
        <div className="row">
          <div className="input-field col s12 m6">
            <input
              id="todo_name"
              type="text"
              value={newTodoName}
              onChange={(e) => setNewTodoName(e.target.value)}
            />
            <label htmlFor="todo_name" className={newTodoName ? "active" : ""}>
              Todo name
            </label>
          </div>

          <div className="input-field col s12 m3">
            <select
              value={newTodoStatus}
              onChange={(e) => setNewTodoStatus(e.target.value)}
            >
              {ALL_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="col s12 m3">
            <button className="btn green" type="submit">
              Add Todo
            </button>
          </div>
        </div>
      </form>

      {/* Todos Grid */}
      {todoRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((todo, innerIndex) => {
            const globalIndex = rowIndex * 4 + innerIndex;
            return (
              <div className="col s12 m3" key={globalIndex}>
                <div
                  className={`card sticky-action ${statusColor(todo.status)}`}
                >
                  <div className="card-image waves-effect waves-block waves-light">
                    <img
                      className="activator"
                      src={statusImage(todo.status)}
                      alt={todo.status}
                    />
                  </div>

                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                      {todo.name}
                      <i className="material-icons right">more_vert</i>
                    </span>
                    <p>
                      <strong>Status:</strong> {todo.status}
                    </p>
                    <p>
                      <strong>Created:</strong> {todo.createdAt}
                    </p>
                    <p>
                      <strong>Modified:</strong> {todo.modifiedAt}
                    </p>
                  </div>

                  <div className="card-action">
                    <Link
                      to={`/todo/${name}/${globalIndex}`}
                      className="blue-text"
                    >
                      Comments
                    </Link>

                    <button
                      className="btn-flat red-text right"
                      onClick={() => deleteTodo(globalIndex)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      Change status
                      <i className="material-icons right">close</i>
                    </span>

                    <div className="row">
                      {ALL_STATUSES.filter((s) => s !== todo.status).map(
                        (status) => (
                          <button
                            key={status}
                            className={`btn col s12 ${statusButtonColor(
                              status
                            )}`}
                            onClick={() => updateStatus(globalIndex, status)}
                          >
                            {status}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Todos;
