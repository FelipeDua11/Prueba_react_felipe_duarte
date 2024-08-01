import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import Register from "./components/AuthForm/Register";
import PageLayaout from "./Layouts/PageLayaout/PageLayaout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <PageLayaout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/register" element={<Register />} />{" "}
        {/* Ruta para la página de registro */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </PageLayaout>
  );
}

export default App;
