import { Link } from "react-router";

export default function KnowledgeCard({ article }) {
  return (
    <div className="knowledge-card mt-lg-1 mt-2 ms-2 me-2 mb-3 position-relative">
      <Link
        to={`/knowledge/article/${article.id}`}
        className="text-decoration-none text-reset"
      >
        <img
          src={article.img}
          alt={article.imgAlt || article.title}
          className="img mb-3"
        />

        <p className="button border-pill position-absolute top-50 start-50 translate-middle">
          <img
            src="./images/knowledge/newspaper_hover.png"
            className="newspaper-icon"
            alt=""
          />
          <span className="material-symbols-outlined fs-7"> 閱讀全文 </span>
        </p>

        <div className="ms-2 me-2">
          <h5 className="mb-1">{article.title}</h5>
          <p className="fs-8 text-neutral-600 mb-3 truncate-multi">
            {article.excerpt}
          </p>

          <div className="d-flex mb-3 flex-wrap">
            {(article.tags ?? []).map((tag) => (
              <p
                key={tag}
                className="knowledge-tag fs-8 text-primary-600 border border-primary-600 me-2 mb-2"
              >
                #{tag}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
