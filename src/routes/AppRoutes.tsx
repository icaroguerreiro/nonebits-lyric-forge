import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainTemplate } from "../templates/Main";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export function AppRoutes() {
  return (
    <BrowserRouter basename="/nonebits-lyric-forge/">
      <Routes>
        <Route element={<MainTemplate />}>
          <Route path="/" element={<Home />} />
          <Route path="/:draft?" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
