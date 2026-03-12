import { Link } from "react-router";
import MemberEmptyState from "../../components/member/MemberEmptyState";
import MemberSectionTitle from "../../components/member/records/MemberSectionTitle";
import MemberSearchForm from "../../components/member/records/MemberSearchForm";
import MemberFilterDropdown from "../../components/member/records/MemberFilterDropdown";
import FoodRecordCard from "../../components/member/records/FoodRecordCard";
import KnowledgeRecordCard from "../../components/member/records/KnowledgeRecordCard";
import useMemberEmptyPreview from "../../hooks/member/useMemberEmptyPreview";
import useMemberRecordControls from "../../hooks/member/useMemberRecordControls";
import { MOCK_FOOD_RECORDS, MOCK_KNOWLEDGE_RECORDS } from "./data/mockRecordData";
import { SORT_OPTIONS } from "./data/recordOptions";

function Favorite() {
  const memberImageBaseUrl = `${import.meta.env.BASE_URL}images/member/`;
  const knowledgeImageBaseUrl = `${import.meta.env.BASE_URL}images/knowledge/`;
  const { forceFoodEmpty, forceKnowledgeEmpty, isAllEmptyPreview } = useMemberEmptyPreview();
  const {
    sortBy,
    searchTerm,
    visibleCount,
    handleSortChange: handleFoodSortChange,
    handleSearchChange: handleFoodSearchChange,
    clearSearch: clearFoodSearch,
    loadMore: loadMoreFoodRecords,
  } = useMemberRecordControls();
  const {
    sortBy: knowledgeSortBy,
    searchTerm: knowledgeSearchTerm,
    visibleCount: knowledgeVisibleCount,
    handleSortChange: handleKnowledgeSortChange,
    handleSearchChange: handleKnowledgeSearchChange,
    clearSearch: clearKnowledgeSearch,
    loadMore: loadMoreKnowledgeRecords,
  } = useMemberRecordControls();

  const sortOptions = SORT_OPTIONS;

  const foodFavoriteBaseRecords = forceFoodEmpty ? [] : MOCK_FOOD_RECORDS;
  const knowledgeFavoriteBaseRecords = forceKnowledgeEmpty ? [] : MOCK_KNOWLEDGE_RECORDS;

  const hasAnyFavoriteRecord =
    foodFavoriteBaseRecords.length > 0 || knowledgeFavoriteBaseRecords.length > 0;
  const hasFoodFavoriteBase = foodFavoriteBaseRecords.length > 0;
  const hasKnowledgeFavoriteBase = knowledgeFavoriteBaseRecords.length > 0;

  if (!hasAnyFavoriteRecord) {
    return (
      <MemberEmptyState
        title="您無任何珍藏項目"
        buttonText={isAllEmptyPreview ? "繼續探索" : "前往探索"}
        to={isAllEmptyPreview ? "/index" : "/food"}
      />
    );
  }

  // 上半區塊（膳食珍藏）搜尋
  const filteredRecords = foodFavoriteBaseRecords.filter((record) =>
    `${record.title}${record.brand}${record.desc}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  // 排序篩選：依照新舊
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return sortBy === "newest" ? bDate - aDate : aDate - bDate;
  });

  // 初始顯示 4 筆，點擊載入更多一次增加 4 筆
  const visibleRecords = sortedRecords.slice(0, visibleCount);
  const hasMore = visibleCount < sortedRecords.length;

  // 下半區塊（專欄珍藏）搜尋
  const filteredKnowledgeRecords = knowledgeFavoriteBaseRecords.filter((record) =>
    `${record.title}${record.excerpt}${(record.tags ?? []).join("")}`
      .toLowerCase()
      .includes(knowledgeSearchTerm.trim().toLowerCase())
  );

  // 排序篩選：依照新舊
  const sortedKnowledgeRecords = [...filteredKnowledgeRecords].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return knowledgeSortBy === "newest" ? bDate - aDate : aDate - bDate;
  });
  // 初始顯示 4 筆，點擊載入更多一次增加 4 筆
  const visibleKnowledgeRecords = sortedKnowledgeRecords.slice(0, knowledgeVisibleCount);
  const hasMoreKnowledge = knowledgeVisibleCount < sortedKnowledgeRecords.length;

  return (
    <>
      {/* 區塊一：膳食珍藏紀錄 */}
      <MemberSectionTitle
        title="膳食珍藏紀錄"
        marginTopClass="mt-6"
        mobileMenu={
          <>
            {sortOptions.map((option) => (
              <li key={`mobile-food-sort-${option.key}`}>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => handleFoodSortChange(option.key)}
                >
                  <i
                    className={`bi bi-check-lg me-2 ${sortBy === option.key ? "" : "invisible"}`}
                  />
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </>
        }
      />
      {hasFoodFavoriteBase ? (
        <>
          <div className="d-none d-lg-flex justify-content-between align-items-center gap-3 flex-wrap member-record-toolbar">
            <div className="justify-content-center member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋珍藏紀錄"
                value={searchTerm}
                onChange={handleFoodSearchChange}
              />
            </div>

            <MemberFilterDropdown
              options={sortOptions}
              selectedKey={sortBy}
              onSelect={handleFoodSortChange}
              keyPrefix="food-desktop-sort"
              label="排序依據"
            />
          </div>

          <div className="d-lg-none member-record-toolbar mb-3">
            <div className="member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋珍藏紀錄"
                value={searchTerm}
                onChange={handleFoodSearchChange}
                formClassName="member-record-search-mobile"
              />
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <MemberEmptyState
              compact
              title="找不到符合條件的膳食珍藏"
              buttonText="清除篩選"
              showIllustration={false}
              onAction={clearFoodSearch}
            />
          ) : (
            <div className="row row-cols-lg-2 row-cols-1 g-3 mt-1 member-record-grid">
              {visibleRecords.map((record) => (
                <div key={record.id} className="col">
                  <Link
                    to={record.targetPath}
                    className="text-decoration-none text-reset d-block h-100"
                  >
                    <FoodRecordCard record={record} imageBaseUrl={memberImageBaseUrl} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {filteredRecords.length > 0 && hasMore && (
            <div className="text-center mt-6">
              <button
                type="button"
                className="rounded-pill px-3 py-1 member-load-more text-neutral-700"
                onClick={loadMoreFoodRecords}
              >
                <i className="bi bi-arrow-repeat me-1 text-secondary-300" />
                載入更多珍藏紀錄
              </button>
            </div>
          )}
        </>
      ) : (
        <MemberEmptyState compact title="您尚未新增膳食珍藏" buttonText="前往探索" to="/food" />
      )}

      <MemberSectionTitle
        title="專欄珍藏紀錄"
        marginTopClass="mt-10"
        mobileMenu={
          <>
            {sortOptions.map((option) => (
              <li key={`mobile-knowledge-sort-${option.key}`}>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => handleKnowledgeSortChange(option.key)}
                >
                  <i
                    className={`bi bi-check-lg me-2 ${knowledgeSortBy === option.key ? "" : "invisible"}`}
                  />
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </>
        }
      />
      {/* 區塊二：專欄珍藏紀錄 */}

      {hasKnowledgeFavoriteBase ? (
        <>
          <div className="d-none d-lg-flex justify-content-between align-items-center gap-3 flex-wrap member-record-toolbar">
            <div className="justify-content-center member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋珍藏紀錄"
                value={knowledgeSearchTerm}
                onChange={handleKnowledgeSearchChange}
              />
            </div>

            <MemberFilterDropdown
              options={sortOptions}
              selectedKey={knowledgeSortBy}
              onSelect={handleKnowledgeSortChange}
              keyPrefix="knowledge-desktop-sort"
              label="排序依據"
            />
          </div>

          <div className="d-lg-none member-record-toolbar mb-3">
            <div className="member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋珍藏紀錄"
                value={knowledgeSearchTerm}
                onChange={handleKnowledgeSearchChange}
              />
            </div>
          </div>

          {filteredKnowledgeRecords.length === 0 ? (
            <MemberEmptyState
              compact
              title="找不到符合條件的專欄珍藏"
              buttonText="清除篩選"
              showIllustration={false}
              onAction={clearKnowledgeSearch}
            />
          ) : (
            <div className="row row-cols-lg-2 row-cols-1 g-3 mt-1 member-record-grid">
              {visibleKnowledgeRecords.map((record) => (
                <div key={record.id} className="col">
                  <Link
                    to={record.targetPath}
                    className="text-decoration-none text-reset d-block h-100"
                  >
                    <KnowledgeRecordCard record={record} imageBaseUrl={knowledgeImageBaseUrl} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {filteredKnowledgeRecords.length > 0 && hasMoreKnowledge && (
            <div className="text-center mt-6">
              <button
                type="button"
                className="rounded-pill px-3 py-1 member-load-more text-neutral-700"
                onClick={loadMoreKnowledgeRecords}
              >
                <i className="bi bi-arrow-repeat me-1 text-secondary-300" />
                載入更多珍藏紀錄
              </button>
            </div>
          )}
        </>
      ) : (
        <MemberEmptyState
          compact
          title="您尚未新增專欄珍藏"
          buttonText="前往學堂"
          to="/knowledge"
        />
      )}
    </>
  );
}

export default Favorite;
