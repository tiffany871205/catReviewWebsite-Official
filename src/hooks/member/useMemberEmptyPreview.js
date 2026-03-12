import { useLocation } from "react-router";

function useMemberEmptyPreview() {
  const location = useLocation();
  const emptyPreview = new URLSearchParams(location.search).get("empty");

  return {
    emptyPreview,
    forceFoodEmpty: emptyPreview === "all" || emptyPreview === "food",
    forceKnowledgeEmpty: emptyPreview === "all" || emptyPreview === "knowledge",
    isAllEmptyPreview: emptyPreview === "all",
  };
}

export default useMemberEmptyPreview;
