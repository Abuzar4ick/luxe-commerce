import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import StoreLayout from "./layouts/StoreLayout";
import AdminLayout from "./layouts/AdminLayout";
import SellerLayout from "./layouts/SellerLayout";
// Store pages
import HomePage from "./apps/store/pages/HomePage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StoreLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
    },
    {
      path: "/seller",
      element: <SellerLayout />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
