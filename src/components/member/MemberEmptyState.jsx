import { Link } from "react-router";

function MemberEmptyState({
  title,
  buttonText,
  to,
  onAction,
  compact = false,
  showIllustration = true,
}) {
  // 會員紀錄共用空狀態：可切整頁/區塊版，並可選導頁或執行動作
  const imageBaseUrl = `${import.meta.env.BASE_URL}images/member/`;

  return (
    <div
      className={`member-empty-state text-center py-11 ${compact ? "member-empty-state--compact" : ""}`}
    >
      {showIllustration ? (
        <img
          src={`${imageBaseUrl}no-result.svg`}
          alt="暫無資料"
          className="member-empty-illustration"
        />
      ) : null}
      <p className="member-empty-text mt-5 mb-8">{title}</p>
      {buttonText ? (
        to ? (
          <Link to={to} className="btn btn-primary-500 text-white rounded-pill member-empty-action">
            <i className="bi bi-arrow-right me-2" />
            {buttonText}
          </Link>
        ) : (
          <button
            type="button"
            className="btn btn-primary-500 text-white rounded-pill member-empty-action"
            onClick={onAction}
          >
            <i className="bi bi-arrow-repeat me-2" />
            {buttonText}
          </button>
        )
      ) : null}
    </div>
  );
}

export default MemberEmptyState;
