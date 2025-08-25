import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-draggable.module.css";
import { decreaseIngredientCount } from "../../services/actions/ingredients";
import {
  deleteIngredient,
  moveIngredient,
} from "../../services/actions/builder";
import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IIngredientDraggable, TDragItem } from "./types";
import { TIngredient } from "../../utils/types";
import { ERoutes } from "../../utils/routes";
import { selectIngredient } from "../../services/actions/ingredient-details";
import { useDispatch } from "../../utils/hooks";

const IngredientDraggable: FC<IIngredientDraggable> = ({
  ingredient,
  index,
  "data-testid": testId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLLIElement>(null);

  const [, drag] = useDrag({
    type: "ingredientDraggable",
    item: { id: ingredient.uniqueId, index },
  });

  const [, drop] = useDrop<TDragItem>({
    accept: "ingredientDraggable",
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor?.getClientOffset() ?? { y: 0 };
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      handleMoveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleMoveIngredient = (dragIndex: number, hoverIndex: number) => {
    if (dragIndex === hoverIndex) return;
    dispatch(moveIngredient(dragIndex, hoverIndex));
  };

  const onIngredientClick = (ingredient: TIngredient) => {
    dispatch(selectIngredient(ingredient));
    navigate(`${ERoutes.ingredients}/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const handleDeleteIngredient = () => {
    dispatch(deleteIngredient(ingredient.uniqueId || ""));
    dispatch(decreaseIngredientCount(ingredient._id));
  };

  return (
    <li className={styles.constructor__item} ref={ref} data-testid={testId}>
      <DragIcon type="primary" className={styles.constructor__drag} />
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest(".constructor-element__action")) {
            return;
          }
          onIngredientClick(ingredient);
        }}
        className={styles.constructor__element}
      >
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={handleDeleteIngredient}
        />
      </div>
    </li>
  );
};

export default IngredientDraggable;
