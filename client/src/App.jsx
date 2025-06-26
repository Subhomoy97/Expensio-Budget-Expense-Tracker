import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Pages/auth/LoginPage/Login";
import Register from "./Pages/auth/RegisterPage/Register";
import ForgotPassword from "./Pages/auth/Forgotpass/ForgotPassword";
import UpdatePassword from "./Pages/auth/UpdatePassword/UpdatePassword";
import VerifyEmail from "./Pages/auth/VerifyEmailPage/VerifyEmail";
import ResetPassword from "./Pages/auth/ResetPassword/ResetPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Transction from "./Pages/Transctions/Transction";
import Budget from "./Pages/Budget/Budget";
import Expance from "./Pages/Expance/Expance";
import Categories from "./Pages/Categories/Categories";
import Myprofile from "./Pages/Profile/Myprofile/Myprofile";
import EditProfile from "./Pages/Profile/Editprofile/EditProfile";
import Analysis from "./Pages/Analysis/Analysis";
import CreateProfile from "./Pages/Profile/CreateProfile/CreateProfile";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import TermsAndConditions from "./Pages/TermsAndConditions";

function App() {
  const publicRoute = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/update-password", element: <UpdatePassword /> },
    { path: "/verify-otp", element: <VerifyEmail /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/services", element: <Service /> },
    { path: "/contact", element: <Contact /> },
    { path: "/terms-conditions", element: <TermsAndConditions /> },
     { path: "*", element: <NotFound /> },
  ];

  const privateRoute = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/transactions", element: <Transction /> },
    { path: "/analysis", element: <Analysis /> },
    { path: "/budgets", element: <Budget /> },
    { path: "/expenses", element: <Expance /> },
    { path: "/categories", element: <Categories /> },
    { path: "/profile", element: <Myprofile /> },
    { path: "/create-profile", element: <CreateProfile /> },
    { path: "/edit-profile", element: <EditProfile /> },
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          {publicRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}

          {/* Private Routes */}
          {privateRoute.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={<PrivateRoute>{item.element}</PrivateRoute>}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
