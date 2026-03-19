export default function CommentBox({ currentUser, newCommentText, setNewCommentText, onSubmit }) {
  return (
    <div className="w-100 py-6 mb-8">
      <div className="comment-box flex-grow-1 position-relative w-100">
        <textarea
          className="form-control border-0 shadow-none"
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            padding: "1rem",
          }}
          placeholder={`以 ${currentUser.nickname} 的身份留言⋯`}
          rows={4}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button
          type="button"
          className={`btn btn-send ${!newCommentText.trim() ? "opacity-50" : ""}`}
          onClick={onSubmit}
          disabled={!newCommentText.trim()}
        >
          <i className="bi bi-send-fill me-2"></i>送出
        </button>
      </div>
    </div>
  );
}
