import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-draggable.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { useDispatch } from "react-redux";
import { DECREASE_INGREDIENT_COUNT } from "../../services/actions/ingredients";
import {
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../services/actions/builder";
import { SELECT_INGREDIENT } from "../../services/actions/ingredient-details";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function IngredientDraggable({ ingredient, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const [, drag] = useDrag({
    type: "ingredientDraggable",
    item: { id: ingredient.uniqueId, index },
  });

  const [, drop] = useDrop({
    accept: "ingredientDraggable",
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const moveIngredient = (dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) return;
    dispatch({
      type: MOVE_INGREDIENT,
      fromIndex: dragIndex,
      toIndex: hoverIndex,
    });
  };

  const onIngredientClick = (ingredient) => {
    dispatch({ type: SELECT_INGREDIENT, ingredient });
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const deleteIngredient = (e) => {
    e.stopPropagation();
    dispatch({
      type: DELETE_INGREDIENT,
      ingredientUniqueId: ingredient.uniqueId,
    });
    dispatch({ type: DECREASE_INGREDIENT_COUNT, ingredientId: ingredient._id });
  };

  return (
    <li className={styles.constructor__item} ref={ref}>
      <DragIcon type="primary" className={styles.constructor__drag} />
      <div
        onClick={() => onIngredientClick(ingredient)}
        className={styles.constructor__element}
      >
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={deleteIngredient}
        />
      </div>
    </li>
  );
}

IngredientDraggable.propTypes = {
  ingredient: IngredientType.isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientDraggable;
