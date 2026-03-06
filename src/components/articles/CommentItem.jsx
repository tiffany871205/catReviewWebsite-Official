import { useState } from "react";

export default function CommentItem({
  id,
  avatar,
  name,
  time,
  text,
  isAuthor,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="comment-item d-flex align-items-start mb-8">
      <div className="flex-shrink-0 me-3">
        <img
          src={avatar}
          alt={name}
          className="comment-avatar rounded-circle"
        />
      </div>

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <p className="fw-bold mb-0">{name}</p>
        </div>
        <p className="text-neutral-600 body-small fs-7 mb-2">{time}</p>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              className="form-control mb-2"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
            />
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary-600 btn-sm text-white"
                onClick={handleSave}
              >
                儲存
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setIsEditing(false)}
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <p className="comment-text pe-3">{text}</p>
        )}
      </div>

      {isAuthor && !isEditing && (
        <div className="dropdown btn bg-white">
          <button
            type="button"
            className="btn btn-link text-muted p-0 no-caret"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-three-dots"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-start">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <img
                  src="./images/knowledge/article/edit_comment.png"
                  alt="edit"
                  className="me-2"
                />
                編輯留言
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                type="button"
                onClick={() => onDelete(id)}
              >
                <img
                  src="./images/knowledge/article/del_comment.png"
                  alt="delete"
                  className="me-2"
                />
                刪除留言
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
