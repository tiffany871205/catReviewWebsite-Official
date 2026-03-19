import axios from "axios";

const COOKIE_NAME = "catToken";

function getTokenFromCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
}

export function getUserFromLocalStorage() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  const token = getTokenFromCookie();
  const user = getUserFromLocalStorage();
  if (token && user) {
    axios.defaults.headers.common["Authorization"] = token;
    return user;
  }
  return null;
}

export function setAuth({ accessToken, user }) {
  try {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    document.cookie = `${COOKIE_NAME}=${accessToken};expires=${expireDate.toUTCString()};path=/`;
    axios.defaults.headers.common["Authorization"] = accessToken;
    localStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.error("setAuth error", e);
  }
}

export function clearAuth() {
  try {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  } catch (e) {
    console.error("clearAuth error", e);
  }
}

export default {
  isAuthenticated,
  setAuth,
  clearAuth,
  getUserFromLocalStorage,
};
