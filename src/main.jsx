import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import About from "./routes/about/About.jsx";
import Exercices from "./routes/exercises/Exercices.jsx";
import Themes from "./routes/themes/Themes.jsx";
import TraceTable from './routes/trace-table/TraceTable';
import Home from "./routes/home/Home.jsx";
import Teacher from "./routes/teacher/Teacher.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Home />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/about" element={<About />} />
          <Route path="/themes/:id" element={<Themes />} />
          <Route path="/exercices/:name" element={<Exercices />} />
          <Route path="/trace-table" element={<TraceTable />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);