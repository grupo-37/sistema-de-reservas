import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import NewProperty from "./components/NewProperty/NewProperty";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard/host/properties/new" element={<NewProperty />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
