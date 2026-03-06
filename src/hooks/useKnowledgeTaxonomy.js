import { useMemo } from "react";

export default function useKnowledgeTaxonomy(db) {
  return useMemo(() => {
    const topicList = db?.knowledgeID?.topics ?? [];
    const categoryList = db?.knowledgeID?.categories ?? [];

    const topics = ["所有主題", ...topicList.map((t) => t.name)];

    const idToTopicName = new Map(topicList.map((t) => [t.id, t.name]));

    const categoriesByTopicName = new Map();
    for (const c of categoryList) {
      const topicName = idToTopicName.get(c.topicId);
      if (!topicName) continue;

      if (!categoriesByTopicName.has(topicName)) {
        categoriesByTopicName.set(topicName, []);
      }
      categoriesByTopicName.get(topicName).push(c.name);
    }

    for (const [topicName, arr] of categoriesByTopicName.entries()) {
      categoriesByTopicName.set(topicName, ["所有知識類別", ...arr]);
    }

    const categoriesAll = ["所有知識類別", ...categoryList.map((c) => c.name)];

    return {
      topics,
      categoriesAll,
      categoriesByTopicName,
    };
  }, [db]);
}
