import { Route, Routes, useLocation } from "react-router-dom";
import AppHeader from "../app-header";
import styles from "./app.module.css";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import NotFound from "../../pages/not-found";
import Ingredient from "../../pages/ingredient";
import ProtectedRouteElement from "../protected-route";
import OrdersHistory from "../../pages/orders-history";
import ProfileWrapper from "../profile-wrapper";
import IngredientModal from "../ingredient-modal";
import { Toaster } from "react-hot-toast";
import { FC } from "react";
import { ERoutes } from "../../utils/routes";
import Feed from "../../pages/feed";
import OrderModal from "../order-modal";
import FeedOrder from "../../pages/feed-order";
import ProfileOrder from "../../pages/profile-order";

const App: FC = () => {
  const location = useLocation();

  const state = location.state;
  const background = state && state.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.page}>
        <Routes location={background || location}>
          <Route path={ERoutes.main} element={<Home />} />
          <Route path={ERoutes.feed} element={<Feed />} />
          <Route path={`${ERoutes.feed}/:id`} element={<FeedOrder />} />
          <Route path={ERoutes.login} element={<Login />} />
          <Route path={ERoutes.register} element={<Register />} />
          <Route path={ERoutes.forgotPassword} element={<ForgotPassword />} />
          <Route path={ERoutes.resetPassword} element={<ResetPassword />} />
          <Route
            path={ERoutes.profile}
            element={<ProtectedRouteElement element={<ProfileWrapper />} />}
          >
            <Route index element={<Profile />} />
            <Route path={ERoutes.orders} element={<OrdersHistory />} />
          </Route>
          <Route
            path={`${ERoutes.profile}/${ERoutes.orders}/:id`}
            element={<ProtectedRouteElement element={<ProfileOrder />} />}
          />
          <Route path={`${ERoutes.ingredients}/:id`} element={<Ingredient />} />
          <Route path={ERoutes.others} element={<NotFound />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path={`${ERoutes.ingredients}/:id`}
              element={<IngredientModal />}
            />
            <Route path={`${ERoutes.feed}/:id`} element={<OrderModal />} />
            <Route
              path={`${ERoutes.profile}/${ERoutes.orders}/:id`}
              element={
                <ProtectedRouteElement
                  element={<OrderModal isFeedModal={false} />}
                />
              }
            />
          </Routes>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
