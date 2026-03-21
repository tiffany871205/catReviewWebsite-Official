function FoodRecordCard({ record, imageBaseUrl, showStatus = false, isDisabled = false }) {
  return (
    <article
      className={`member-record-card bg-white h-100 d-flex flex-column ${isDisabled ? "member-record-card--disabled" : ""}`}
    >
      <img
        src={record.imageUrl || `${imageBaseUrl}${record.image}`}
        alt={record.title}
        className="w-100 member-record-card-image"
      />

      <div className="p-3 member-record-card-body flex-grow-1">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <h3 className="member-record-card-title mb-0">{record.title}</h3>
          <p className="member-record-brand mb-0 text-nowrap">{record.brand}</p>
        </div>

        <div className="d-flex gap-4 mb-3">
          <div>
            <p className="member-record-label mb-1">參考價格</p>
            <h5 className="member-record-value mb-0">{record.price}</h5>
          </div>
          <div>
            <p className="member-record-label mb-1">重量</p>
            <h5 className="member-record-value mb-0">{record.weight}</h5>
          </div>
        </div>

        <p className="member-record-desc mb-0">{record.desc}</p>
      </div>

      <div className="member-record-footer d-flex justify-content-between align-items-center p-3 pt-2 mt-auto">
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

export default FoodRecordCard;
