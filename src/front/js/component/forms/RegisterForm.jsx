import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { User } from "../../../models/User.class";
import "../../../styles/forms.css";
import { Navigate } from "react-router-dom";
import { AlertToastifyComponent } from "./alerts/AlertToastifyComponent.jsx";

export const RegisterForm = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
      password.length >= 8 &&
      password === repeatPassword
    ) {
      const user = new User(email, password);
      actions.register(user);
    } else {
      actions.notifyError(
        "¡Datos Incorrectos! Complete los campos adecuadamente"
      );
    }
  };

  useEffect(() => {
    if (store.error) {
      actions.notifyError(
        "Error en la conexión con la base de datos, intentelo más tarde"
      );
      actions.resetError();
    }
  }, [store.error]);

  return (
    <>
      {store.registered ? (
        <Navigate to={"/login"} />
      ) : (
        <div className="h-75 position-absolute w-100 d-flex justify-content-center align-items-center">
          <div className="card container-form p-4">
            <div className="card-body">
              <h5 className="card-title text-center titulo">
                Registro de Usuario
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="row my-4 d-flex justify-content-center">
                  <input
                    className="campo text-center"
                    type="text"
                    name="email"
                    placeholder="Introduce el email Ej. ejemplo@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="row my-4 d-flex justify-content-center">
                  <input
                    className="campo text-center"
                    type="password"
                    name="password"
                    placeholder="Introduce Password (Min. 8) "
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="row my-4 d-flex justify-content-center">
                  <input
                    className="campo text-center"
                    type="password"
                    name="repeatEmail"
                    placeholder="Repite el Password"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                  />
                </div>

                <div className="row d-flex justify-content-center">
                  <button className="btn-form p-2 mt-2" type="submit">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <AlertToastifyComponent />
          </div>
        </div>
      )}
    </>
  );
};
