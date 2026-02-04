//註冊測試方法

import axios from "axios";

function signUp() {
  axios
    .post("http://localhost:3000/signup", {
      email: "test123@gmail.com",
      password: "password123",
      nickname: "貓奴一號",
      tel: "0912345678",
    })
    .then((response) => {
      console.log("註冊成功:", response.data);
      alert("註冊成功！");
    })
    .catch((error) => {
      console.error("註冊失敗:", error.response?.data || error.message);
      alert("註冊失敗");
    });
}

export default signUp;
