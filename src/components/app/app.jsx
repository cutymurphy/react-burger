import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "../app-header";
import styles from "./app.module.css";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import Ingredient from "../../pages/ingredient";
import NotFound from "../../pages/not-found";
import ProtectedRouteElement from "../protected-route";
import OrdersHistory from "../../pages/orders-history";
import ProfileWrapper from "../profile-wrapper";
import Order from "../../pages/order";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <div className={styles.page}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={<ProfileWrapper />}
                  isProtectedFromUnAuthUser
                />
              }
            >
              <Route index element={<Profile />} />
              <Route path="orders" element={<OrdersHistory />} />
              <Route path="orders/:number" element={<Order />} />
            </Route>
            <Route path="/ingredients/:id" element={<Ingredient />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
