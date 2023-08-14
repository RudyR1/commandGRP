import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Lang from "../components/Lang";
import { FormEvent, useState,ChangeEvent } from "react";
import api from "../services/axiosAPi";
import layer from "../assets/Layer_register.png";
import Button from "../components/Button";

export default function Register() {
  type passwordBis = string;

  type form = {
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
    postal_code: string;
    profile_picture: string;
    adress: string;
    city: string;
    is_producer: boolean;
    password: string;
  };

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [notifSamePass, setNotifSamePass] = useState<boolean>(false);
  const [passwordBis, setPasswordBis] = useState<passwordBis | null>(null);
  const [form, setForm] = useState<form>({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    postal_code: "",
    profile_picture: "",
    adress: "",
    city: "",
    is_producer: false,
    password: "",
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (passwordBis === form.password) {
      const register = api.auth.register(form);
      if ((await register) === "This user has been created") {
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        console.log(await register);
      }
    } else {
      setNotifSamePass(true);
      console.log("error");
    }
  }

  return (
    <>
      <Lang />
      <div className="register_container">
        <div className="form_bloc">
          <h1 className="login_title">{t("register.title")}</h1>
          <form action="submit" className="form_container" onSubmit={onSubmit}>
            <input
              type="text"
              id="lastname"
              placeholder={t("register.lastname")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  lastname: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <input
              type="text"
              id="firstname"
              placeholder={t("register.firstname")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  firstname: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <input
              type="text"
              id="email"
              placeholder={t("register.email")}
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  email: (e.target as HTMLInputElement).value,
                });
                setNotifSamePass(false);
              }}
            />

            <input
              type="text"
              name="profile_picture"
              id="profile_picture"
              placeholder={t("register.profile_picture")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  profile_picture: (e.target as HTMLInputElement).value,
                });
              }}
            />
            <input
              type="password"
              id="password"
              pattern=".{12,}"
              title="Twelve or more characters"
              placeholder={t("register.password")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  password: (e.target as HTMLInputElement).value,
                });
                setNotifSamePass(false);
              }}
            />

            <input
              type="password"
              id="password_bis"
              pattern=".{8,}"
              title="Eight or more characters"
              placeholder={t("register.password_bis")}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPasswordBis((e.target as HTMLInputElement).value);
                setNotifSamePass(false);
              }}
            />
            {notifSamePass === true && (
              <p className="notsame">{t("register.passnotsame")}</p>
            )}

            <input
              type="text"
              id="phone_number"
              placeholder={t("register.phone_number")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  phone_number: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <input
              type="text"
              id="adress"
              placeholder={t("register.adress")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  adress: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <input
              type="text"
              id="postal_code"
              placeholder={t("register.postal_code")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  postal_code: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <input
              type="text"
              id="city"
              placeholder={t("register.city")}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  city: (e.target as HTMLInputElement).value,
                });
              }}
            />
            <label htmlFor="is_producer">{t("register.producer")}</label>
            <input
              type="checkbox"
              name="is_producer"
              id="is_producer"
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  is_producer: (e.target as HTMLInputElement).checked,
                });
              }}
            />
            <Button
              type="submit"
              id="submit_button"
              nameClass="primary"
              text={t("register.submit")}
            />
          </form>
        </div>
        <img className="register_img" src={layer} alt="" />
      </div>
    </>
  );
}
