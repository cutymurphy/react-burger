import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../services/actions/user";
import {
  initialEdit,
  initialInfo,
  TProfile,
  TProfileEdit,
  TProfileErrors,
  TSaveProfile,
} from "./utils";
import { validateField } from "../../utils/validation";
import { Dispatch } from "redux";

const Profile: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { user: storeUser, accessToken } = useSelector(
    (store: any) => store.user
  );
  const initialUser: TProfile = { ...storeUser, password: "" };

  const [profile, setProfile] = useState<TProfile>({ ...initialInfo });
  const [profileErrors, setProfileErrors] = useState<TProfileErrors>({});
  const [editedFields, setEditedFields] = useState<TProfileEdit>({
    ...initialEdit,
  });
  const [editOpen, setEditOpen] = useState<TProfileEdit>({ ...initialEdit });

  const onChange = <K extends keyof TProfile>(field: K, value: TProfile[K]) => {
    setProfile({ ...profile, [field]: value });
    setEditedFields({
      ...editedFields,
      [field]: value !== initialUser[field],
    });
    if (profileErrors[field]) {
      setProfileErrors({ ...profileErrors, [field]: "" });
    }
  };

  const onChangeEditOpen = (field: keyof TProfileEdit) => {
    setEditOpen({ ...editOpen, [field]: !editOpen[field] });
  };

  const validate = () => {
    const errors: TProfileErrors = {};
    for (const field in editedFields) {
      const key = field as keyof TProfileEdit;
      if (editedFields[key]) {
        const error = validateField(field, profile[key]);
        if (error) {
          errors[key] = error;
        }
      }
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      const changedData: TSaveProfile = {};
      for (const field in editedFields) {
        const key = field as keyof TProfile;
        if (editedFields[key]) {
          changedData[key] = profile[key].trim();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeUser]);

  return (
    <form className={styles.profile__form} onSubmit={handleSaveProfile}>
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
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
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
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
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
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
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
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;
