import { useNavigate, useParams } from "react-router-dom";
import IngredientDetails from "../ingredient-details";
import Modal from "../modal";
import { FC, useEffect } from "react";
import { RingLoader } from "react-spinners";
import styles from "./ingredient-modal.module.css";
import { TIngredient } from "../../utils/types";
import {
  selectIngredient,
  unselectIngredient,
} from "../../services/actions/ingredient-details";
import { useDispatch, useSelector } from "../../utils/hooks";

const IngredientModal: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest } = useSelector(
    (store) => store.ingredients
  );
  const selectedIngredient = useSelector(
    (store) => store.ingredient.selectedIngredient
  );

  const handleCloseModal = () => {
    navigate(-1);
    dispatch(unselectIngredient());
  };

  useEffect(() => {
    if (!selectedIngredient && ingredients.length > 0) {
      const ingredient = ingredients.find(
        (item: TIngredient) => item._id === id
      );
      if (ingredient) {
        dispatch(selectIngredient(ingredient));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, ingredients]);

  return (
    <Modal title="Детали ингредиента" onClose={handleCloseModal}>
      {ingredientsRequest || !selectedIngredient ? (
        <div className={styles.loader}>
          <RingLoader color="var(--dark-grey)" loading size={100} />
        </div>
      ) : (
        <IngredientDetails />
      )}
    </Modal>
  );
};

export default IngredientModal;
