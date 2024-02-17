import { Navigate, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/common/protectedRoute";
import RegisterForm from "./components/common/registerForm";
import LoginForm from "./components/common/loginForm";
import LogOut from "./components/common/logout";
import NotFound from "./components/common/notFound";
import NavBar from "./components/navbar";
// import MovieForm from "./components/movieForm";
import MoviePage from "./components/moviePage";
// import GenresList from "./components/genresList";
import Instruments from "./components/instruments";

import ThemeProvider, { useThemeState } from "./context/ThemeContext";
import { getCurrentUser } from "./services/authService";
import Rentals from "./components/rentals";
import RentalsProvider from "./context/RentalsContext";
import Customer from "./components/customer";

const App = () => {
  const [theme, toggleTheme] = useThemeState();

  const user = getCurrentUser();
  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <RentalsProvider>
        <div id={theme} className="App">
          <ToastContainer />
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/movies" element={<Instruments />} />
              <Route
                path="/movies/:id"
                // element={user?.isAdmin ? <MovieForm /> : <MoviePage />}
              />
              {/* <Route path="/genres" element={<GenresList />} /> */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/rentals/customer/:id" element={<Customer />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/" element={<Navigate to="/movies" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </RentalsProvider>
    </ThemeProvider>
  );
};

export default App;
