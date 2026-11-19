import "./App.css";
import { TraceTableProvider } from "./contexts/TraceTableContext";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <div className="app">
      <TraceTableProvider>
        <RouterProvider router={router} />
      </TraceTableProvider>
    </div>
  );
}

export default App;
