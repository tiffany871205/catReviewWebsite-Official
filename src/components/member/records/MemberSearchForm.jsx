function MemberSearchForm({ placeholder, value, onChange, formClassName = "" }) {
  return (
    <form className={`position-relative w-100 record-search ${formClassName}`.trim()}>
      <input
        type="text"
        className="form-control rounded-pill py-2 ps-3 pe-5"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <i
        className="bi bi-search text-neutral-500 position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center me-2"
        style={{ fontSize: "1.2rem" }}
      />
    </form>
  );
}

export default MemberSearchForm;
