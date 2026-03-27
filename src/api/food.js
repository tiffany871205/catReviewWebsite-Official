import axios from "axios";
import API_BASE from "./client";

export async function getFoods() {
  const res = await axios.get(`${API_BASE}/food`);
  return res.data;
}

export async function getFoodMeta() {
  const res = await axios.get(`${API_BASE}/foodID`);
  return res.data;
}

export async function getFoodDetailById(id) {
  const res = await axios.get(`${API_BASE}/foodDetail/${id}`);
  return res.data;
}

export async function getFoodComments(foodId) {
  const res = await axios.get(`${API_BASE}/foodComment?foodId=${foodId}&_sort=id&_order=desc`);
  return res.data;
}

export async function createFoodComment(payload) {
  const res = await axios.post(`${API_BASE}/foodComment`, payload);
  return res.data;
}

export async function updateFoodComment(commentId, payload) {
  const res = await axios.patch(`${API_BASE}/foodComment/${commentId}`, payload);
  return res.data;
}

export async function deleteFoodComment(commentId) {
  const res = await axios.delete(`${API_BASE}/foodComment/${commentId}`);
  return res.data;
}

export async function getFoodFavs(userId) {
  const res = await axios.get(`${API_BASE}/foodFav?userId=${userId}`);
  return res.data;
}

export async function getFoodFavByUserAndFood(userId, foodId) {
  const res = await axios.get(`${API_BASE}/foodFav?userId=${userId}`);
  const favs = res.data ?? [];

  return favs.filter((item) => Number(item.foodId) === Number(foodId));
}

export async function createFoodFav(payload) {
  const res = await axios.post(`${API_BASE}/foodFav`, payload);
  return res.data;
}

export async function deleteFoodFav(favId) {
  const res = await axios.delete(`${API_BASE}/foodFav/${favId}`);
  return res.data;
}
