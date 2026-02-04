//登入測試方法

import axios from "axios";

function login() {
  axios
    .post("http://localhost:3000/login", {
      email: "test123@gmail.com",
      password: "password123",
    })
    .then((response) => {
      console.log("登入成功:", response.data);
      alert("登入成功！");
    })
    .catch((error) => {
      console.error("登入失敗:", error.response?.data || error.message);
      alert("登入失敗");
    });
}
export default login;
