import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 文章
export async function getKnowledgeArticles() {
  const res = await axios.get(`${API_BASE}/knowledge`);
  return res.data;
}

export async function getKnowledgeArticleById(id) {
  const res = await axios.get(`${API_BASE}/knowledge/${id}`);
  return res.data;
}

export async function getKnowledgeArticleDetail(id) {
  const res = await axios.get(`${API_BASE}/knowledgeDetail/${id}`);
  return res.data;
}

export async function getKnowledgeComments(articleId) {
  const res = await axios.get(
    `${API_BASE}/knowledgeComment?articleId=${articleId}&_sort=id&_order=desc`
  );
  return res.data;
}

export async function getKnowledgeMeta() {
  const res = await axios.get(`${API_BASE}/knowledgeID`);
  return res.data;
}

export async function createKnowledgeComment(payload) {
  const res = await axios.post(`${API_BASE}/knowledgeComment`, payload);
  return res.data;
}

export async function updateKnowledgeComment(commentId, payload) {
  const res = await axios.patch(
    `${API_BASE}/knowledgeComment/${commentId}`,
    payload
  );
  return res.data;
}

export async function deleteKnowledgeComment(commentId) {
  const res = await axios.delete(`${API_BASE}/knowledgeComment/${commentId}`);
  return res.data;
}

// 收藏
export async function getKnowledgeFavs(userId) {
  const res = await axios.get(`${API_BASE}/knowledgeFav?userId=${userId}`);
  return res.data;
}

export async function getKnowledgeFavByUserAndArticle(userId, articleId) {
  const res = await axios.get(
    `${API_BASE}/knowledgeFav?userId=${userId}&articleId=${articleId}`
  );
  return res.data;
}

export async function createKnowledgeFav(payload) {
  const res = await axios.post(`${API_BASE}/knowledgeFav`, payload);
  return res.data;
}

export async function deleteKnowledgeFav(favId) {
  const res = await axios.delete(`${API_BASE}/knowledgeFav/${favId}`);
  return res.data;
}
