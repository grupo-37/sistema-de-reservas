import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Register from "./pages/RegisterGuest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
            <Route path="/" element={<Registerguest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;