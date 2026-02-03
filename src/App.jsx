import { Outlet, Link } from "react-router";

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
      <h1>這個是外層</h1>
    </>
  );
}

export default App;
