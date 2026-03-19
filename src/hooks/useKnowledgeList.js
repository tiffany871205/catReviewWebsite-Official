import { useEffect, useMemo, useState } from "react";
import useKnowledgeTaxonomy from "./useKnowledgeTaxonomy";

export default function useKnowledgeList(db, options = {}) {
  const pageSize = options.pageSize ?? 9;
  const articles = db?.knowledge ?? [];

  const taxonomy = useKnowledgeTaxonomy(db);

  const [keyword, setKeyword] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!selectedTopic) return;

    const validCategories =
      taxonomy.categoriesByTopicName.get(selectedTopic) ?? [];

    if (selectedCategory && !validCategories.includes(selectedCategory)) {
      setSelectedCategory("");
    }
  }, [selectedTopic, selectedCategory, taxonomy]);

  useEffect(() => {
    setPage(1);
  }, [keyword, selectedTopic, selectedCategory]);

  const currentCategories = useMemo(() => {
    if (!selectedTopic) return taxonomy.categoriesAll;
    return (
      taxonomy.categoriesByTopicName.get(selectedTopic) ?? ["所有知識類別"]
    );
  }, [selectedTopic, taxonomy]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return articles.filter((a) => {
      const text = `${a.title ?? ""} ${a.excerpt ?? ""}`.toLowerCase();
      const matchKeyword = !k || text.includes(k);

      const tags = a.tags ?? [];
      const matchTopic = !selectedTopic || tags.includes(selectedTopic);
      const matchCategory =
        !selectedCategory || tags.includes(selectedCategory);

      return matchKeyword && matchTopic && matchCategory;
    });
  }, [articles, keyword, selectedTopic, selectedCategory]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filtered.length / pageSize));
  }, [filtered.length, pageSize]);

  const pageClamped = useMemo(() => {
    return Math.min(page, totalPages);
  }, [page, totalPages]);

  const paged = useMemo(() => {
    const start = (pageClamped - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageClamped, pageSize]);

  const clear = () => {
    setKeyword("");
    setSelectedTopic("");
    setSelectedCategory("");
    setPage(1);
  };

  return {
    paged,
    filtered,
    topics: taxonomy.topics,
    currentCategories,
    keyword,
    selectedTopic,
    selectedCategory,
    page: pageClamped,
    totalPages,
    pageSize,
    setKeyword,
    setSelectedTopic,
    setSelectedCategory,
    setPage,
    clear,
  };
}
