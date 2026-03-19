function MemberFilterDropdown({
  options,
  selectedKey,
  onSelect,
  keyPrefix,
  label,
  icon = "tune",
  iconType = "material",
  className = "dropdown ms-auto flex-shrink-0",
}) {
  return (
    <div className={className}>
      <button
        type="button"
        className="btn btn-neutral-100 py-1 px-3 d-flex align-items-center text-nowrap"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {iconType === "bootstrap" ? (
          <i className={`${icon} me-1`} />
        ) : (
          <span className="material-symbols-outlined me-1">{icon}</span>
        )}
        <span>{label}</span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end mt-2 py-1 shadow-sm member-sort-menu">
        {options.map((option) => (
          <li key={`${keyPrefix}-${option.key}`}>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              onClick={() => onSelect(option.key)}
            >
              <i
                className={`bi bi-check-lg me-2 ${selectedKey === option.key ? "" : "invisible"}`}
              />
              <span>{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberFilterDropdown;
