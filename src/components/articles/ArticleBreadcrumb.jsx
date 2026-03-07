import { Link } from "react-router-dom";

export default function ArticleBreadcrumb({ topicName, categoryName, title }) {
  const topicQuery = topicName
    ? `/knowledge?topic=${encodeURIComponent(topicName)}`
    : "/knowledge";

  const categoryQuery =
    topicName && categoryName
      ? `/knowledge?topic=${encodeURIComponent(
          topicName
        )}&category=${encodeURIComponent(categoryName)}`
      : "/knowledge";

  return (
    <div className="section-1">
      <div className="container">
        <div className="row">
          <nav
            aria-label="breadcrumb"
            style={{ "--bs-breadcrumb-divider": "'>'" }}
            className="pt-3"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item knowledge-breadcrumb-item">
                <Link to="/knowledge">喵皇學堂</Link>
              </li>

              {topicName && (
                <li className="breadcrumb-item knowledge-breadcrumb-item">
                  <Link to={topicQuery}>{topicName}</Link>
                </li>
              )}

              {categoryName && (
                <li className="breadcrumb-item knowledge-breadcrumb-item">
                  <Link to={categoryQuery}>{categoryName}</Link>
                </li>
              )}

              <li
                className="breadcrumb-item knowledge-breadcrumb-item d-md-block d-none active"
                aria-current="page"
              >
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
