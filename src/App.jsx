import { Outlet, Link } from "react-router";
import axios from "axios";

function signUp() {
  axios
    .post("http://localhost:3000/signup", {
      email: "test123@gmail.com",
      password: "password123",
      username: "testuser",
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

function App() {
  return (
    <>
      <h1>這個是外層</h1>
      <nav>
        <Link to="/index">首頁</Link> |<Link to="/food">食品</Link> |
        <Link to="/knowledge">知識</Link> |<Link to="/contrib">投稿</Link> |
        <Link to="/member">會員</Link>
      </nav>
      <hr />
      <Outlet />
      <button onClick={signUp}>註冊</button>
      <h1>這個是外層</h1>
    </>
  );
}

export default App;
