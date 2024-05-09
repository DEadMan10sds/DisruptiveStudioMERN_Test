import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { General } from "./layouts/GeneralLayout";
import axios from "axios";
import { HomePage } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const store = createStore({
  authName: "_auth",
  authType: "localstorage",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <RequireAuth fallbackPath={"/login"}>
        <General />
      </RequireAuth>
    ),

    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          return await axios
            .get("http://localhost:3000/api/multimedia/all")
            .then((fetchResponse) => fetchResponse)
            .catch(() => {
              return { data: { data: [] } };
            });
        },
      },
      {
        path: "/thematics",
        element: <>Thematics</>,
      },
      {
        path: "/multimedia",
        element: <>Multimedia</>,
      },
    ],
  },
]);

const App = () => (
  <AuthProvider store={store}>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
