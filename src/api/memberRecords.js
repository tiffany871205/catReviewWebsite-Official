import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const STATUS_LABEL_MAP = {
  pending: "審核中",
  approved: "審核通過",
  rejected: "未通過",
};

function normalizeImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== "string") return "";

  const trimmedPath = imagePath.trim();
  if (!trimmedPath) return "";

  if (/^https?:\/\//i.test(trimmedPath)) {
    return trimmedPath;
  }

  const normalizedPath = /^\/images\/food\/00\d\.jpg$/i.test(trimmedPath)
    ? trimmedPath.replace(/\.jpg$/i, ".png")
    : trimmedPath;

  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  if (normalizedPath.startsWith("/")) {
    return `${normalizedBaseUrl}${normalizedPath.slice(1)}`;
  }

  if (normalizedPath.startsWith("./")) {
    return `${normalizedBaseUrl}${normalizedPath.slice(2)}`;
  }

  return `${normalizedBaseUrl}${normalizedPath}`;
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toTimestamp(dateValue) {
  if (!dateValue) return 0;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 0;
  return date.getTime();
}

function toPriceLabel(price) {
  if (typeof price !== "number") return "NT$ 0";
  return `NT$ ${price.toLocaleString("zh-TW")}`;
}

function toTaxonomyDesc({ ingredientProfile, taxonomyMaps }) {
  const flavor = taxonomyMaps.flavors.get(ingredientProfile?.flavorId);
  const contentType = taxonomyMaps.contentTypes.get(ingredientProfile?.contentTypeId);
  const formula = taxonomyMaps.specialFormulas.get(ingredientProfile?.specialFormulaId);
  const target = taxonomyMaps.targets.get(ingredientProfile?.targetId);

  return [flavor, contentType, formula, target].filter(Boolean).join(" | ");
}

function buildFoodTaxonomyMaps(foodID) {
  const flavors = new Map((foodID?.flavors ?? []).map((item) => [item.id, item.name]));
  const contentTypes = new Map((foodID?.contentTypes ?? []).map((item) => [item.id, item.name]));
  const specialFormulas = new Map(
    (foodID?.specialFormulas ?? []).map((item) => [item.id, item.name])
  );
  const targets = new Map((foodID?.targets ?? []).map((item) => [item.id, item.name]));

  return { flavors, contentTypes, specialFormulas, targets };
}

function toFoodRecord({ relation, food, foodDetail, taxonomyMaps, includeStatus }) {
  const basicInfo = relation.basicInfo ?? {};
  const relationDesc = toTaxonomyDesc({
    ingredientProfile: relation.ingredientProfile,
    taxonomyMaps,
  });
  const fallbackDesc = toTaxonomyDesc({
    ingredientProfile: {
      flavorId: food?.flavorId,
      contentTypeId: food?.contentTypeId,
      specialFormulaId: food?.specialFormulaId,
      targetId: food?.targetId,
    },
    taxonomyMaps,
  });

  return {
    id: relation.id,
    title: basicInfo.name ?? food?.name ?? "未命名食品",
    brand: basicInfo.brand ?? foodDetail?.basicInfo?.brand ?? "未提供品牌",
    price: toPriceLabel(basicInfo.price ?? food?.price),
    weight: basicInfo.weight ?? food?.weight ?? "-",
    desc: relationDesc || fallbackDesc || "-",
    date: formatDate(relation.createdAt || relation.updatedAt),
    sortTimestamp: toTimestamp(relation.createdAt || relation.updatedAt),
    status: relation.status ?? "pending",
    statusLabel: STATUS_LABEL_MAP[relation.status] ?? STATUS_LABEL_MAP.pending,
    image: "",
    imageUrl: normalizeImageUrl(
      relation.images?.contentImages?.[0] || relation.images?.packageImages?.[0] || food?.coverImage
    ),
    targetPath: "/food",
    showStatus: includeStatus,
  };
}

function toKnowledgeRecord({ relation, knowledge, includeStatus }) {
  const articleId = relation.knowledgeId ?? relation.articleId ?? knowledge?.id;

  return {
    id: relation.id,
    title: relation.title ?? knowledge?.title ?? "未命名文章",
    excerpt: relation.excerpt ?? knowledge?.excerpt ?? "",
    tags: relation.tags ?? knowledge?.tags ?? [],
    date: formatDate(relation.createdAt || relation.updatedAt),
    sortTimestamp: toTimestamp(relation.createdAt || relation.updatedAt),
    status: relation.status ?? "pending",
    statusLabel: STATUS_LABEL_MAP[relation.status] ?? STATUS_LABEL_MAP.pending,
    image: "",
    imageUrl: normalizeImageUrl(relation.coverImage ?? knowledge?.img),
    targetPath: articleId ? `/knowledge/article/${articleId}` : "/knowledge",
    showStatus: includeStatus,
  };
}

export async function fetchFavoriteRecords(userId) {
  if (!API_BASE || !userId) {
    return { foodRecords: [], knowledgeRecords: [] };
  }

  const [foodFavRes, foodRes, foodDetailRes, foodIDRes, knowledgeFavRes, knowledgeRes] =
    await Promise.all([
      axios.get(`${API_BASE}/foodFav`, { params: { userId } }),
      axios.get(`${API_BASE}/food`),
      axios.get(`${API_BASE}/foodDetail`),
      axios.get(`${API_BASE}/foodID`),
      axios.get(`${API_BASE}/knowledgeFav`, { params: { userId } }),
      axios.get(`${API_BASE}/knowledge`),
    ]);

  const foodMap = new Map((foodRes.data ?? []).map((item) => [item.id, item]));
  const foodDetailMap = new Map((foodDetailRes.data ?? []).map((item) => [item.id, item]));
  const taxonomyMaps = buildFoodTaxonomyMaps(foodIDRes.data);
  const knowledgeMap = new Map((knowledgeRes.data ?? []).map((item) => [item.id, item]));

  const foodRecords = (foodFavRes.data ?? []).map((relation) =>
    toFoodRecord({
      relation,
      food: foodMap.get(relation.foodId),
      foodDetail: foodDetailMap.get(relation.foodId),
      taxonomyMaps,
      includeStatus: false,
    })
  );

  const knowledgeRecords = (knowledgeFavRes.data ?? []).map((relation) =>
    toKnowledgeRecord({
      relation,
      knowledge: knowledgeMap.get(relation.knowledgeId ?? relation.articleId),
      includeStatus: false,
    })
  );

  return { foodRecords, knowledgeRecords };
}

export async function fetchContributionRecords(userId) {
  if (!API_BASE || !userId) {
    return { foodRecords: [], knowledgeRecords: [] };
  }

  const [foodContribRes, foodRes, foodDetailRes, foodIDRes, knowledgeContribRes, knowledgeRes] =
    await Promise.all([
      axios.get(`${API_BASE}/foodContrib`, { params: { userId } }),
      axios.get(`${API_BASE}/food`),
      axios.get(`${API_BASE}/foodDetail`),
      axios.get(`${API_BASE}/foodID`),
      axios.get(`${API_BASE}/knowledgeContrib`, { params: { userId } }),
      axios.get(`${API_BASE}/knowledge`),
    ]);

  const foodMap = new Map((foodRes.data ?? []).map((item) => [item.id, item]));
  const foodDetailMap = new Map((foodDetailRes.data ?? []).map((item) => [item.id, item]));
  const taxonomyMaps = buildFoodTaxonomyMaps(foodIDRes.data);
  const knowledgeMap = new Map((knowledgeRes.data ?? []).map((item) => [item.id, item]));

  const foodRecords = (foodContribRes.data ?? []).map((relation) =>
    toFoodRecord({
      relation,
      food: foodMap.get(relation.foodId),
      foodDetail: foodDetailMap.get(relation.foodId),
      taxonomyMaps,
      includeStatus: true,
    })
  );

  const knowledgeRecords = (knowledgeContribRes.data ?? []).map((relation) =>
    toKnowledgeRecord({
      relation,
      knowledge: knowledgeMap.get(relation.knowledgeId),
      includeStatus: true,
    })
  );

  return { foodRecords, knowledgeRecords };
}

export async function fetchCommentRecords(currentUser) {
  const userId = Number(currentUser?.id);
  const nickname = (currentUser?.nickname ?? "").trim();

  if (!API_BASE || !userId) {
    return { foodRecords: [], knowledgeRecords: [] };
  }

  const [foodCommentRes, foodRes, knowledgeCommentRes, knowledgeRes] = await Promise.all([
    axios.get(`${API_BASE}/foodComment`, { params: { userId } }),
    axios.get(`${API_BASE}/food`),
    axios.get(`${API_BASE}/knowledgeComment`, { params: { userId } }),
    axios.get(`${API_BASE}/knowledge`),
  ]);

  const foodMap = new Map((foodRes.data ?? []).map((item) => [item.id, item]));
  const knowledgeMap = new Map((knowledgeRes.data ?? []).map((item) => [item.id, item]));
  const filteredFoodComments = (foodCommentRes.data ?? []).filter(
    (item) => Number(item.userId) === userId
  );

  const filteredKnowledgeComments = (knowledgeCommentRes.data ?? []).filter(
    (item) =>
      Number(item.userId) === userId ||
      (item.userId == null && nickname.length > 0 && item.name === nickname)
  );

  const foodRecords = filteredFoodComments.map((item) => {
    const food = foodMap.get(item.foodId);
    const commentDate = item.createdAt || item.updatedAt || item.time;

    return {
      id: item.id,
      foodName: food?.name ?? "未命名食品",
      rating: item.rating ?? 0,
      date: formatDate(commentDate),
      relativeTime: formatDate(commentDate),
      sortTimestamp: toTimestamp(commentDate),
      content: item.content ?? "",
      photos: item.photos ?? [],
      targetPath: "/food",
    };
  });

  const knowledgeRecords = filteredKnowledgeComments.map((item) => {
    const articleId = item.articleId ?? item.knowledgeId;
    const knowledge = knowledgeMap.get(articleId);
    const commentDate = item.createdAt || item.updatedAt || item.time;
    const commentQuery = articleId ? `?commentId=${item.id}` : "";

    return {
      id: item.id,
      articleTitle: knowledge?.title ?? "未命名文章",
      rating: item.rating ?? 0,
      date: formatDate(commentDate),
      relativeTime: formatDate(commentDate),
      sortTimestamp: toTimestamp(commentDate),
      content: item.text ?? item.content ?? "",
      targetPath: articleId ? `/knowledge/article/${articleId}${commentQuery}` : "/knowledge",
    };
  });

  return { foodRecords, knowledgeRecords };
}
