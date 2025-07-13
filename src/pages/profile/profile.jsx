import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../services/actions/user";
import { initialEdit, initialInfo } from "./utils";
import { validateField } from "../../utils/validation";

function Profile() {
  const dispatch = useDispatch();
  const { user: storeUser, accessToken } = useSelector((store) => store.user);
  const initialUser = { ...storeUser, password: "" };

  const [profile, setProfile] = useState({ ...initialInfo });
  const [profileErrors, setProfileErrors] = useState({});
  const [editedFields, setEditedFields] = useState({ ...initialEdit });
  const [editOpen, setEditOpen] = useState({ ...initialEdit });

  const onChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
    setEditedFields({
      ...editedFields,
      [field]: value !== initialUser[field],
    });
    if (profileErrors[field]) {
      setProfileErrors({ ...profileErrors, [field]: "" });
    }
  };

  const onChangeEditOpen = (field) => {
    setEditOpen({ ...editOpen, [field]: !editOpen[field] });
  };

  const validate = () => {
    const errors = {};
    for (const field in editedFields) {
      if (editedFields[field]) {
        const error = validateField(field, profile[field]);
        if (error) {
          errors[field] = error;
        }
      }
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = () => {
    if (validate()) {
      const changedData = {};
      for (const field in editedFields) {
        if (editedFields[field]) {
          changedData[field] = profile[field].trim();
        }
      }

      dispatch(editUser(accessToken, changedData));
    }
  };

  const clearForm = () => {
    setProfile({ ...initialUser });
    setProfileErrors({});
    setEditedFields({ ...initialEdit });
  };

  useEffect(() => {
    if (storeUser) {
      clearForm();
    }
  }, [storeUser]);

  return (
    <form className={styles.profile__form}>
      <Input
        placeholder={"Имя"}
        type={"text"}
        onChange={(e) => onChange("name", e.target.value)}
        value={profile.name}
        icon={editOpen.name ? "CloseIcon" : "EditIcon"}
        onIconClick={() => onChangeEditOpen("name")}
        extraClass={`mb-6 ${styles.profile__field}`}
        disabled={!editOpen.name}
        errorText={profileErrors.name}
        error={!!profileErrors.name}
      />
      <Input
        placeholder={"Логин"}
        type={"text"}
        onChange={(e) => onChange("email", e.target.value)}
        value={profile.email}
        icon={editOpen.email ? "CloseIcon" : "EditIcon"}
        onIconClick={() => onChangeEditOpen("email")}
        extraClass={`mb-6 ${styles.profile__field}`}
        disabled={!editOpen.email}
        errorText={profileErrors.email}
        error={!!profileErrors.email}
      />
      <Input
        placeholder={"Пароль"}
        type={"password"}
        onChange={(e) => onChange("password", e.target.value)}
        value={profile.password}
        icon={editOpen.password ? "CloseIcon" : "EditIcon"}
        onIconClick={() => onChangeEditOpen("password")}
        extraClass={`mb-6 ${styles.profile__field}`}
        disabled={!editOpen.password}
        errorText={profileErrors.password}
        error={!!profileErrors.password}
      />
      {Object.values(editedFields).some((value) => !!value) && (
        <div className={styles.profile__btns}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={clearForm}
          >
            Отмена
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleSaveProfile}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default Profile;
