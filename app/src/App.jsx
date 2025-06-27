import { BrowserRouter, Routes, Route } from "react-router";
import { RecoilRoot } from "recoil";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import NewPropertyPage from "./pages/NewPropertyPage";
import RegisterHost from "./pages/RegisterHost";
import Login from "./pages/LoginPage";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard/host/properties/new" element={<NewPropertyPage />} />
                        <Route path="/register/host" element={<RegisterHost />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
