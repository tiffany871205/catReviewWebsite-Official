function KnowledgeRecordCard({ record, imageBaseUrl, showStatus = false, isDisabled = false }) {
  return (
    <article
      className={`member-record-card bg-white h-100 ${isDisabled ? "member-record-card--disabled" : ""}`}
    >
      <img
        src={`${imageBaseUrl}${record.image}`}
        alt={record.title}
        className="w-100 member-knowledge-record-card-image"
      />

      <div className="p-3 member-record-card-body">
        <h3 className="member-knowledge-record-card-title mb-1">{record.title}</h3>
        <p className="member-knowledge-record-excerpt mb-3">{record.excerpt}</p>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {(record.tags ?? []).map((tag) => (
            <span key={`${record.id}-${tag}`} className="member-knowledge-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="member-record-footer d-flex justify-content-between align-items-center p-3 pt-2">
        <p className="member-record-date mb-0">{record.date}</p>
        {showStatus ? (
          <span
            className={`member-record-status${record.status !== "pending" ? ` member-record-status--${record.status}` : ""}`}
          >
            {record.statusLabel}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export default KnowledgeRecordCard;
