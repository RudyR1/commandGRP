import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, FormEvent } from "react";
import api from "../services/axiosAPi";
import layer from "../assets/Layer_1.png";
import Button from "../components/Button";
import Lang from "../components/Lang";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [logError, setLogError] = useState<boolean>(false);

  type loginForm = {
    email: string;
    password: string;
  };
  const [loginForm, setLoginForm] = useState<loginForm>({
    email: "",
    password: "",
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const login = api.auth.login(loginForm);
    login
      .then(() => {
        setLogError(false),
          setTimeout(() => {
            navigate("/home");
          }, 500);
      })
      .catch(() => {
        setLogError(true);
      });
  }
  return (
    <>
      <Lang />

      <div className="login_container">
        <div className="form_bloc">
          <form action="submit" className="form_container" onSubmit={onSubmit}>
            <h1 className="login_title">{t("login.title")}</h1>

            <input
              type="email"
              id="email"
              placeholder={t("register.email")}
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              onChange={(e) => {
                setLogError(false),
                setLoginForm({ ...loginForm, email: e.target.value });
              }}
            />

            <input
              type="password"
              id="password"
              placeholder={t("register.password")}
              onChange={(e) => {
                setLogError(false),
                setLoginForm({ ...loginForm, password: e.target.value });
              }}
            />
            {logError === true && (
              <div className="logError_modal">
                <p>{t("login.error")}</p>
              </div>
            )}
            <div className="login_bottom">
              <p
                className="forgot_pass"
                onClick={() => {
                  alert("il faut créer une modal");
                }}
              >
                {t("login.forgotPass")}
              </p>
            </div>
            <Button
              type="submit"
              id="submit_button"
              nameClass="primary"
              text={t("login.submit")}
            />
          </form>
        </div>
        <img className="login_img" src={layer} alt="" />
      </div>
    </>
  );
}
