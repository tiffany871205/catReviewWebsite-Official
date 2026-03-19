import { Navigate } from "react-router";
import App from "../App.jsx";
import Index from "../pages/Index.jsx";
import Food from "../pages/Food.jsx";
import Contrib from "../pages/Contrib.jsx";
import Member from "../pages/Member.jsx";
import FoodProductPage from "../components/food/FoodProduct.jsx";
import Account from "../pages/member/Account.jsx";
import Record from "../pages/member/Record.jsx";
import SignUp from "../components/common/SignUp.jsx";
import Knowledge from "../pages/Knowledge.jsx";
import KnowledgeArticle from "../pages/Article.jsx";
import Comment from "../pages/member/Comment.jsx";
import Favorite from "../pages/member/Favorite.jsx";
import Contribution from "../pages/member/Contribution.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "index",
        element: <Index />,
      },
      {
        path: "food",
        element: <Food />,
      },
      {
        path: "food/product",
        element: <FoodProductPage />,
      },
      {
        path: "knowledge",
        element: <Knowledge />,
      },
      {
        path: "knowledge/article/:id",
        element: <KnowledgeArticle />,
      },
      {
        path: "contrib",
        element: <Contrib />,
      },
      {
        path: "member",
        element: <Member />,
        children: [
          {
            index: true,
            element: <Navigate to="account" replace />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "record",
            element: <Record />,
            children: [
              {
                index: true,
                element: <Navigate to="comment" replace />,
              },
              {
                path: "comment",
                element: <Comment />,
              },
              {
                path: "favorite",
                element: <Favorite />,
              },
              {
                path: "contribution",
                element: <Contribution />,
              },
            ],
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
