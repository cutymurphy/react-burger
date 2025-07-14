import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/user";
import { RingLoader } from "react-spinners";
import styles from "./protected-route.module.css";
import PropTypes from "prop-types";

function ProtectedRouteElement({ element, isProtectedFromUnAuthUser = false }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user, accessToken } = useSelector((store) => store.user);

  const [isUserLoaded, setUserLoaded] = useState(false);

  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (!user && refreshToken) {
      dispatch(getUser(accessToken)).finally(() => {
        setUserLoaded(true);
      });
    } else {
      setUserLoaded(true);
    }
  }, [dispatch, accessToken, user, refreshToken]);

  if (!isUserLoaded) {
    return (
      <div className={styles.wrapper}>
        <RingLoader color="var(--dark-grey)" loading size={100} />
      </div>
    );
  }

  if (isProtectedFromUnAuthUser && !user) {
    return <Navigate to="/login" state={{ fromPath: pathname }} replace />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  isProtectedFromUnAuthUser: PropTypes.bool,
};

export default ProtectedRouteElement;
