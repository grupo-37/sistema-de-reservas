import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import NewPropertyPage from "./pages/NewPropertyPage";
import RegisterHost from "./pages/RegisterHost";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard/host/properties/new" element={<NewPropertyPage />} />
                    <Route path="/register/host" element={<RegisterHost />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
  
}

export default App;
