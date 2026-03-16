function MemberSectionTitle({
  title,
  marginTopClass = "mt-6",
  mobileButtonLabel = "排序依據",
  mobileButtonIcon = "tune",
  mobileMenu,
}) {
  return (
    <>
      <h2
        className={`d-none d-lg-block fs-4 pb-8 border-bottom border-secondary-300 mb-6 ${marginTopClass}`}
      >
        {title}
      </h2>

      <div
        className={`d-flex d-lg-none justify-content-between align-items-center pb-3 border-bottom border-secondary-300 mb-3 ${marginTopClass}`}
      >
        <h2 className="fs-6 mb-0">{title}</h2>
        {mobileMenu ? (
          <div className="dropdown ms-2 flex-shrink-0">
            <button
              type="button"
              className="btn btn-neutral-100 py-1 px-3 d-flex align-items-center text-nowrap"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="material-symbols-outlined me-1">{mobileButtonIcon}</span>
              <span>{mobileButtonLabel}</span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end mt-2 py-1 shadow-sm member-sort-menu">
              {mobileMenu}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default MemberSectionTitle;
