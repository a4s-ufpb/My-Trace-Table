import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home.jsx";
import About from "./routes/about/About.jsx";
import Exercices from "./routes/exercises/Exercices.jsx";
import Operators from "./routes/exercises/operators/Operators.jsx";
import Conditionals from "./routes/exercises/conditionals/Conditionals.jsx";
import Repeats from "./routes/exercises/repeats/Repeats.jsx";
import Lists from "./routes/exercises/lists/Lists.jsx";
import TraceTable from "./routes/trace-table/TraceTable.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exercices" element={<Exercices />} />

          <Route path="/exercices/operators" element={<Operators />} />
          <Route path="/exercices/conditionals" element={<Conditionals />} />
          <Route path="/exercices/repeats" element={<Repeats />} />
          <Route path="/exercices/lists" element={<Lists />} />

          <Route path="/exercices/operators/:id" element={<TraceTable />} />
          <Route path="/exercices/conditionals/:id" element={<TraceTable />} />
          <Route path="/exercices/repeats/:id" element={<TraceTable />} />
          <Route path="/exercices/lists/:id" element={<TraceTable />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
