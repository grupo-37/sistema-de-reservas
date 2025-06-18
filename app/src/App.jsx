<<<<<<< HEAD
function App() {
  return (
    <>
      <h1>APP</h1>
    </>
  );
}

export default App;
=======
import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> 602b1c6a0324f91e416966892b8a18ce465a2712
