import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Comments() {
  const { name, todoIndex } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  /* ---------- Placeholder API Calls ---------- */
  const fetchComments = async () => {
    // TODO: Replace with actual HTTP request
    console.log(`Fetching comments for todo #${todoIndex} in ${name}`);
    return [];
  };

  const addCommentRequest = async (comment) => {
    // TODO: Replace with actual HTTP request
    console.log("Adding comment:", comment);
    return { success: true };
  };

  const deleteCommentRequest = async (index) => {
    // TODO: Replace with actual HTTP request
    console.log("Deleting comment at index:", index);
    return { success: true };
  };

  /* ---------- Lifecycle ---------- */
  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchComments();
      setComments(data);
    };
    loadComments();
  }, [name, todoIndex]);

  /* ---------- Add Comment ---------- */
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const timestamp = new Date().toLocaleString();
    const comment = { text: newComment, createdAt: timestamp };

    const res = await addCommentRequest(comment);
    if (res.success) {
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  };

  /* ---------- Delete Comment ---------- */
  const handleDelete = async (index) => {
    const res = await deleteCommentRequest(index);
    if (res.success) {
      setComments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <h3>
        Comments for Todo #{todoIndex + 1} in Collection:{" "}
        <strong>{name}</strong>
      </h3>

      {/* ---------- Add Comment Form ---------- */}
      <form onSubmit={handleAddComment} style={{ marginBottom: "20px" }}>
        <div className="row">
          <div className="input-field col s10">
            <input
              type="text"
              id="new_comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <label htmlFor="new_comment" className={newComment ? "active" : ""}>
              Add a comment...
            </label>
          </div>
          <div className="col s2" style={{ marginTop: "10px" }}>
            <button className="btn green" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>

      {/* ---------- Comments List ---------- */}
      <div className="collection">
        {comments.length === 0 && (
          <div className="grey-text">No comments yet.</div>
        )}

        {comments.map((comment, index) => (
          <div key={index} className="collection-item">
            <span>{comment.text}</span>
            <span className="grey-text right">{comment.createdAt}</span>
            <button
              className="btn-flat red-text right"
              onClick={() => handleDelete(index)}
            >
              <i className="large material-icons">delete_forever</i>
            </button>
          </div>
        ))}
      </div>

      <Link to={`/todo/${name}`} className="btn blue">
        ← Back to Todos
      </Link>
    </>
  );
}

export default Comments;
