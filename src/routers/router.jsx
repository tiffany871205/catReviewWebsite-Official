import App from "../App.jsx";
import Index from "../pages/Index.jsx";
import Food from "../pages/Food.jsx";
import Knowledge from "../pages/Knowledge.jsx";
import Contrib from "../pages/Contrib.jsx";
import Member from "../pages/Member.jsx";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "index",
        element: <Index />,
      },
      {
        path: "food",
        element: <Food />,
      },
      {
        path: "knowledge",
        element: <Knowledge />,
      },
      {
        path: "contrib",
        element: <Contrib />,
      },
      {
        path: "member",
        element: <Member />,
      },
      {
        path: "header",
        element: <Header />,
      },
      {
        path: "footer",
        element: <Footer />,
      },
    ],
  },
];

export default routes;
