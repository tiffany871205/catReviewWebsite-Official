import { Link } from "react-router";
import { useState } from "react";
import MemberEmptyState from "../../components/member/MemberEmptyState";
import MemberSectionTitle from "../../components/member/records/MemberSectionTitle";
import MemberSearchForm from "../../components/member/records/MemberSearchForm";
import MemberFilterDropdown from "../../components/member/records/MemberFilterDropdown";
import FoodRecordCard from "../../components/member/records/FoodRecordCard";
import KnowledgeRecordCard from "../../components/member/records/KnowledgeRecordCard";
import useMemberEmptyPreview from "../../hooks/member/useMemberEmptyPreview";
import useMemberRecordControls from "../../hooks/member/useMemberRecordControls";
import { MOCK_FOOD_RECORDS, MOCK_KNOWLEDGE_RECORDS } from "./data/mockRecordData";
import { SORT_OPTIONS, STATUS_OPTIONS } from "./data/recordOptions";

function Contribution() {
  const memberImageBaseUrl = `${import.meta.env.BASE_URL}images/member/`;
  const knowledgeImageBaseUrl = `${import.meta.env.BASE_URL}images/knowledge/`;
  const [statusFilter, setStatusFilter] = useState("all");
  const [knowledgeStatusFilter, setKnowledgeStatusFilter] = useState("all");
  const { forceFoodEmpty, forceKnowledgeEmpty } = useMemberEmptyPreview();
  const {
    sortBy,
    searchTerm,
    visibleCount,
    resetVisibleCount: resetFoodVisibleCount,
    handleSortChange: handleFoodSortChange,
    handleSearchChange: handleFoodSearchChange,
    clearSearch: clearFoodSearch,
    loadMore: loadMoreFoodRecords,
  } = useMemberRecordControls();
  const {
    sortBy: knowledgeSortBy,
    searchTerm: knowledgeSearchTerm,
    visibleCount: knowledgeVisibleCount,
    resetVisibleCount: resetKnowledgeVisibleCount,
    handleSortChange: handleKnowledgeSortChange,
    handleSearchChange: handleKnowledgeSearchChange,
    clearSearch: clearKnowledgeSearch,
    loadMore: loadMoreKnowledgeRecords,
  } = useMemberRecordControls();

  const sortOptions = SORT_OPTIONS;
  const statusOptions = STATUS_OPTIONS;

  const foodContributionBaseRecords = forceFoodEmpty ? [] : MOCK_FOOD_RECORDS;
  const knowledgeContributionBaseRecords = forceKnowledgeEmpty ? [] : MOCK_KNOWLEDGE_RECORDS;

  const hasAnyContributionRecord =
    foodContributionBaseRecords.length > 0 || knowledgeContributionBaseRecords.length > 0;
  const hasFoodContributionBase = foodContributionBaseRecords.length > 0;
  const hasKnowledgeContributionBase = knowledgeContributionBaseRecords.length > 0;

  if (!hasAnyContributionRecord) {
    return <MemberEmptyState title="您無任何投稿項目" buttonText="前往投稿" to="/contrib" />;
  }

  // 上半區塊（膳食投稿）搜尋
  const filteredRecords = foodContributionBaseRecords.filter((record) => {
    const matchesSearch = `${record.title}${record.brand}${record.desc}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  // 日期排序
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return sortBy === "newest" ? bDate - aDate : aDate - bDate;
  });
  // 初始顯示 4 筆，點「載入更多」每次增加 4 筆
  const visibleRecords = sortedRecords.slice(0, visibleCount);
  const hasMore = visibleCount < sortedRecords.length;

  // 下半區塊（專欄投稿）搜尋
  const filteredKnowledgeRecords = knowledgeContributionBaseRecords.filter((record) => {
    const matchesSearch = `${record.title}${record.excerpt}${(record.tags ?? []).join("")}`
      .toLowerCase()
      .includes(knowledgeSearchTerm.trim().toLowerCase());

    const matchesStatus =
      knowledgeStatusFilter === "all" || record.status === knowledgeStatusFilter;

    return matchesSearch && matchesStatus;
  });
  // 日期排序
  const sortedKnowledgeRecords = [...filteredKnowledgeRecords].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return knowledgeSortBy === "newest" ? bDate - aDate : aDate - bDate;
  });
  // 初始顯示 4 筆，點「載入更多」每次增加 4 筆
  const visibleKnowledgeRecords = sortedKnowledgeRecords.slice(0, knowledgeVisibleCount);
  const hasMoreKnowledge = knowledgeVisibleCount < sortedKnowledgeRecords.length;

  return (
    <>
      {/* 區塊一：膳食投稿紀錄 */}
      <MemberSectionTitle
        title="膳食投稿記錄"
        marginTopClass="mt-6"
        mobileButtonLabel="篩選與排序"
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
            <li>
              <hr className="dropdown-divider my-1" />
            </li>
            {statusOptions.map((option) => (
              <li key={`mobile-food-status-${option.key}`}>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => {
                    setStatusFilter(option.key);
                    resetFoodVisibleCount();
                  }}
                >
                  <i
                    className={`bi bi-check-lg me-2 ${statusFilter === option.key ? "" : "invisible"}`}
                  />
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </>
        }
      />
      {hasFoodContributionBase ? (
        <>
          <div className="d-none d-lg-flex justify-content-between align-items-center gap-3 flex-wrap member-record-toolbar">
            <div className="justify-content-center member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋投稿紀錄"
                value={searchTerm}
                onChange={handleFoodSearchChange}
              />
            </div>
            <div className="d-flex align-items-center gap-2 ms-auto flex-shrink-0">
              <MemberFilterDropdown
                options={statusOptions}
                selectedKey={statusFilter}
                onSelect={(nextValue) => {
                  setStatusFilter(nextValue);
                  resetFoodVisibleCount();
                }}
                keyPrefix="food-desktop-status"
                label="狀態篩選"
                icon="bi bi-funnel"
                iconType="bootstrap"
                className="dropdown"
              />

              <MemberFilterDropdown
                options={sortOptions}
                selectedKey={sortBy}
                onSelect={handleFoodSortChange}
                keyPrefix="food-desktop-sort"
                label="排序依據"
                className="dropdown"
              />
            </div>
          </div>

          <div className="d-lg-none member-record-toolbar mb-3">
            <div className="member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋投稿紀錄"
                value={searchTerm}
                onChange={handleFoodSearchChange}
                formClassName="member-record-search-mobile"
              />
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <MemberEmptyState
              compact
              title="找不到符合條件的膳食投稿"
              buttonText="清除篩選"
              showIllustration={false}
              onAction={() => {
                clearFoodSearch();
                setStatusFilter("all");
                resetFoodVisibleCount();
              }}
            />
          ) : (
            <div className="row row-cols-lg-2 row-cols-1 g-3 mt-1 member-record-grid">
              {visibleRecords.map((record) => {
                const isRejected = record.status === "rejected";

                const card = (
                  <FoodRecordCard
                    record={record}
                    imageBaseUrl={memberImageBaseUrl}
                    showStatus
                    isDisabled={isRejected}
                  />
                );

                return (
                  <div key={record.id} className="col">
                    {isRejected ? (
                      <div className="d-block h-100">{card}</div>
                    ) : (
                      <Link
                        to={record.targetPath}
                        className="text-decoration-none text-reset d-block h-100"
                      >
                        {card}
                      </Link>
                    )}
                  </div>
                );
              })}
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
                載入更多投稿紀錄
              </button>
            </div>
          )}
        </>
      ) : (
        <MemberEmptyState compact title="您尚未新增膳食投稿" buttonText="前往投稿" to="/contrib" />
      )}

      <MemberSectionTitle
        title="專欄投稿紀錄"
        marginTopClass="mt-10"
        mobileButtonLabel="篩選與排序"
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
            <li>
              <hr className="dropdown-divider my-1" />
            </li>
            {statusOptions.map((option) => (
              <li key={`mobile-knowledge-status-${option.key}`}>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => {
                    setKnowledgeStatusFilter(option.key);
                    resetKnowledgeVisibleCount();
                  }}
                >
                  <i
                    className={`bi bi-check-lg me-2 ${knowledgeStatusFilter === option.key ? "" : "invisible"}`}
                  />
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </>
        }
      />
      {/* 區塊二：專欄投稿紀錄 */}

      {hasKnowledgeContributionBase ? (
        <>
          <div className="d-none d-lg-flex justify-content-between align-items-center gap-3 flex-wrap member-record-toolbar">
            <div className="justify-content-center member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋投稿紀錄"
                value={knowledgeSearchTerm}
                onChange={handleKnowledgeSearchChange}
              />
            </div>

            <div className="d-flex align-items-center gap-2 ms-auto flex-shrink-0">
              <MemberFilterDropdown
                options={statusOptions}
                selectedKey={knowledgeStatusFilter}
                onSelect={(nextValue) => {
                  setKnowledgeStatusFilter(nextValue);
                  resetKnowledgeVisibleCount();
                }}
                keyPrefix="knowledge-desktop-status"
                label="狀態篩選"
                icon="bi bi-funnel"
                iconType="bootstrap"
                className="dropdown"
              />

              <MemberFilterDropdown
                options={sortOptions}
                selectedKey={knowledgeSortBy}
                onSelect={handleKnowledgeSortChange}
                keyPrefix="knowledge-desktop-sort"
                label="排序依據"
                className="dropdown"
              />
            </div>
          </div>

          <div className="d-lg-none member-record-toolbar mb-3">
            <div className="member-record-search-wrap">
              <MemberSearchForm
                placeholder="搜尋投稿紀錄"
                value={knowledgeSearchTerm}
                onChange={handleKnowledgeSearchChange}
                formClassName="member-record-search-mobile"
              />
            </div>
          </div>

          {filteredKnowledgeRecords.length === 0 ? (
            <MemberEmptyState
              compact
              title="找不到符合條件的專欄投稿"
              buttonText="清除篩選"
              showIllustration={false}
              onAction={() => {
                clearKnowledgeSearch();
                setKnowledgeStatusFilter("all");
                resetKnowledgeVisibleCount();
              }}
            />
          ) : (
            <div className="row row-cols-lg-2 row-cols-1 g-3 mt-1 member-record-grid">
              {visibleKnowledgeRecords.map((record) => {
                const isRejected = record.status === "rejected";

                const card = (
                  <KnowledgeRecordCard
                    record={record}
                    imageBaseUrl={knowledgeImageBaseUrl}
                    showStatus
                    isDisabled={isRejected}
                  />
                );

                return (
                  <div key={record.id} className="col">
                    {isRejected ? (
                      <div className="d-block h-100">{card}</div>
                    ) : (
                      <Link
                        to={record.targetPath}
                        className="text-decoration-none text-reset d-block h-100"
                      >
                        {card}
                      </Link>
                    )}
                  </div>
                );
              })}
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
                載入更多投稿紀錄
              </button>
            </div>
          )}
        </>
      ) : (
        <MemberEmptyState compact title="您尚未新增專欄投稿" buttonText="前往投稿" to="/contrib" />
      )}
    </>
  );
}

export default Contribution;
