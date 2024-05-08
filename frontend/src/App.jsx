import { useState } from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { General } from "./layouts/GeneralLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <General />,
    children: [
      {
        index: true,
        element: <AppComponent />,
      },
    ],
  },
]);

function AppComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

const App = () => <RouterProvider router={router} />;

export default App;
