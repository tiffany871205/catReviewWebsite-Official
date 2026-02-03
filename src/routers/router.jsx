import Index from "../pages/Index.jsx";
import Food from "../pages/Food.jsx";
import Knowledge from "../pages/Knowledge.jsx";
import Contrib from "../pages/Contrib.jsx";
import member from "../pages/Member.jsx";

const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/food",
    element: <Food />,
  },
  {
    path: "/knowledge",
    element: <Knowledge />,
  },
  {
    path: "/contrib",
    element: <Contrib />,
  },
  {
    path: "/member",
    element: <member />,
  },
];

export default routes;
