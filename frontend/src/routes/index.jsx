import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AcademicHub from '../pages/AcademicHub';
import CampusCommunity from '../pages/CampusCommunity';
import PlatformSupport from '../pages/PlatformSupport';
import CreatePost from '../pages/CreatePost';

const Routes = () => {
  const { isAuthenticated } = useAuth();

  // Let's organize our routes more clearly
  const publicRoutes = [
    {
      path: "/",
      element: <Home />
    }
  ];

  const authRoutes = [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ];

  const protectedRoutes = [
    {
      path: "/post/academic-hub",
      element: <AcademicHub />
    },
    {
      path: "/post/campus-community",
      element: <CampusCommunity />
    },
    {
      path: "/post/platform-support",
      element: <PlatformSupport />
    },
    {
      path: "/create-post",
      element: <CreatePost />
    }
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // Public routes are always available
        ...publicRoutes,
        
        // Auth routes only available when not logged in
        ...(!isAuthenticated ? authRoutes : []),
        
        // Protected routes wrapped in ProtectedRoute component
        {
          element: <ProtectedRoute />,
          children: protectedRoutes
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;