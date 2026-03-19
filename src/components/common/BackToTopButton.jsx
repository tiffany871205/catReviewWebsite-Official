export default function BackToTopButton({ onClick, className = "" }) {
  const handleClick =
    onClick ??
    (() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  return (
    <button
      type="button"
      className={`btn btn-primary knowledge-back-btn border-0 ${className}`.trim()}
      onClick={handleClick}
    >
      <i className="bi bi-arrow-up-circle" /> 回到頂端
    </button>
  );
}