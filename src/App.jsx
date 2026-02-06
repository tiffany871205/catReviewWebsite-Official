import { Outlet, Link } from "react-router";
import axios from "axios";

import signUp from "./utils/signUp.jsx";
import Header from "./components/common/Header.jsx";

function App() {
  return (
    <>
      <h1>這個是外層</h1>
      <Header />
      <button onClick={signUp}>註冊</button>
      <hr />
      <Outlet />
      <h1>這個是外層</h1>
    </>
  );
}

export default App;
