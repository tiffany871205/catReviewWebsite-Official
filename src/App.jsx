import { Outlet, Link } from "react-router";
import axios from "axios";

import signUp from "./utils/signUp.js";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <button onClick={signUp}>註冊</button>
      <hr />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
