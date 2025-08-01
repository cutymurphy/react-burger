import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./not-found.module.css";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { ERoutes } from "../../utils/routes";

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoHomePage = () => {
    navigate(ERoutes.main, { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large mb-6">404</p>
      <p className="text text_type_main-large mb-10">Page not found</p>
      <Button
        htmlType="button"
        type="secondary"
        size="large"
        onClick={handleGoHomePage}
      >
        Go home
      </Button>
    </div>
  );
};

export default NotFound;
