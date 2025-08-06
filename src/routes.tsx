import { Routes, Route } from "react-router-dom"
import {Board} from "./pages/Board"
import {NotFound} from "./pages/NotFount"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
