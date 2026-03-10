export default function ArticleBlock({ block, index }) {
  if (!block) return null;

  switch (block.type) {
    case "heading":
      return (
        <p className="fw-bold text-neutral-900 pb-2">{block.content ?? ""}</p>
      );

    case "paragraph":
      return <p className="mb-32">{block.content ?? ""}</p>;

    case "list":
      return (
        <section className="food-item">
          <p className="fw-bold text-neutral-900 pb-2">
            {block.title ?? `段落 ${index + 1}`}
          </p>
          <ul className="article-list">
            {(block.items ?? []).map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        </section>
      );

    case "tip":
      return (
        <div className="p-3 mb-32 bg-white border rounded">
          <p className="mb-0">
            <strong className="me-2">TIP</strong>
            {block.content ?? ""}
          </p>
        </div>
      );

    case "summary":
      return (
        <div className="p-3 mb-32 bg-secondary-100 border rounded">
          <p className="mb-0">
            <strong className="me-2">總結</strong>
            {block.content ?? ""}
          </p>
        </div>
      );

    default:
      return null;
  }
}
