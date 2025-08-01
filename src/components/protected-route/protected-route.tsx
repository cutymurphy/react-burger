import { Navigate, useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/user";
import { RingLoader } from "react-spinners";
import styles from "./protected-route.module.css";
import { IProtectedRouteElement } from "./types";
import { ERoutes } from "../../utils/routes";

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({
  element,
  isProtectedFromUnAuthUser = false,
}) => {
  const dispatch: any = useDispatch();
  const { pathname } = useLocation();
  const { user, accessToken } = useSelector((store: any) => store.user);

  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

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
    return (
      <Navigate to={ERoutes.login} state={{ fromPath: pathname }} replace />
    );
  }

  return element;
};

export default ProtectedRouteElement;
