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
