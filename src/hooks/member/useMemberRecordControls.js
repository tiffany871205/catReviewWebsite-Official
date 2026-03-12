import { useState } from "react";

function useMemberRecordControls({ initialSortBy = "newest", pageSize = 4 } = {}) {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const resetVisibleCount = () => {
    setVisibleCount(pageSize);
  };

  const handleSortChange = (nextSortBy) => {
    setSortBy(nextSortBy);
    resetVisibleCount();
  };

  const handleSearchChange = (nextSearchTerm) => {
    setSearchTerm(nextSearchTerm);
    resetVisibleCount();
  };

  const clearSearch = () => {
    setSearchTerm("");
    resetVisibleCount();
  };

  const loadMore = () => {
    setVisibleCount((previousCount) => previousCount + pageSize);
  };

  return {
    sortBy,
    searchTerm,
    visibleCount,
    setSortBy,
    setSearchTerm,
    resetVisibleCount,
    handleSortChange,
    handleSearchChange,
    clearSearch,
    loadMore,
  };
}

export default useMemberRecordControls;
