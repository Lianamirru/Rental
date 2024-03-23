import { Navigate, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/common/protectedRoute";
import RegisterForm from "./components/forms/registerForm";
import LoginForm from "./components/forms/loginForm";
import LogOut from "./components/common/form-elements/logout";
import NotFound from "./components/common/notFound";
import NavBar from "./components/layout/navbar";

import InstrumentPage from "./components/pages/instrumentPage";
import Instruments from "./components/pages/instruments";

import ThemeProvider, { useThemeState } from "./context/ThemeContext";
import Rentals from "./components/pages/rentals";
import RentalsProvider from "./context/RentalsContext";
import Cart from "./components/pages/cart";
import Favorites from "./components/pages/favorites";
import LikedInstrumentsProvider from "./context/LikedInstrumentsContext";
import Profile from "./components/page-item/profile";

const App = () => {
  const [theme, toggleTheme] = useThemeState();
  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <div id={theme} className="App">
        <ToastContainer />
        <NavBar />
        <main className="container">
          <RentalsProvider>
            <LikedInstrumentsProvider>
              <Routes>
                <Route path="/instruments" element={<Instruments />} />
                <Route path="/instruments/:id" element={<InstrumentPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/rentals/customer/:id" element={<Profile />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route
                  path="/"
                  element={<Navigate to="/instruments" replace />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LikedInstrumentsProvider>
          </RentalsProvider>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
