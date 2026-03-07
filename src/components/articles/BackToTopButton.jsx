export default function BackToTopButton() {
  return (
    <button
      className="btn btn-primary knowledge-back-btn border-0"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="bi bi-arrow-up-circle"></i> 回到頂端
    </button>
  );
}
