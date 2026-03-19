export default function FoodPagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) {
    return null;
  }

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="m-auto mt-10 w-100">
      <ul className="d-flex justify-content-center align-items-center">
        <li className="page-item me-2">
          <button
            type="button"
            className="btn knowledge-btn"
            onClick={() => canPrev && setPage(page - 1)}
            disabled={!canPrev}
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li className="page-item me-2" key={p}>
            <button
              type="button"
              className={`btn knowledge-btn ${
                p === page ? "btn-primary-600 border-0 text-white active" : ""
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            type="button"
            className="btn knowledge-btn"
            onClick={() => canNext && setPage(page + 1)}
            disabled={!canNext}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </div>
  );
}
