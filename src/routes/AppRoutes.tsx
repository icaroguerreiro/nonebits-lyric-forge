import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainTemplate } from "../templates/Main";
import { PATHS } from "./paths";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainTemplate />}>
          <Route path="/" element={<Home />} />
          <Route path={`${PATHS.home}/:draft?`} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
