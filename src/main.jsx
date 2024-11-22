import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home.jsx";
import About from "./routes/about/About.jsx";
import Exercices from "./routes/exercises/Exercices.jsx";
import Users from "./routes/users/Users.jsx";
import Themes from "./routes/themes/Themes.jsx";
import TraceTable from './routes/trace-table/TraceTable';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/themes/:id" element={<Themes />} />
          <Route path="/exercices/:id" element={<Exercices />} />
          <Route path="/trace-table" element={<TraceTable />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
