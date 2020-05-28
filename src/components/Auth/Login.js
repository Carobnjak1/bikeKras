import React from "react";
import useFormValidation from "./useFormValidation";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    isSubmitting,
    values,
  } = useFormValidation(INITIAL_STATE, authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push("/trails");
    } catch (err) {
      console.error("Auth err", err);
      setFirebaseError(err.message);
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">
        {login ? "Prijava" : "Registracija"}
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i>{" "}
        {login ? "Prijavi se in dodaj svoje poti" : "Ustvarjanje računa"}
      </p>
      <form onSubmit={handleSubmit} className="form">
        {!login && (
          <div className="form-group">
            <input
              onChange={handleChange}
              value={values.name}
              type="text"
              placeholder="Vaše ime"
              name="name"
              required
            />
          </div>
        )}
        <div className="form-group">
          <input
            onChange={handleChange}
            value={values.email}
            type="email"
            placeholder="Email naslov"
            name="email"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            value={values.password}
            type="password"
            placeholder="Geslo"
            name="password"
            minLength="6"
          />
        </div>

        {firebaseError && (
          <div className="alert alert-danger">{firebaseError}</div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          Izvedi
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setLogin((prevLogin) => !prevLogin)}
        >
          {login ? "potrebujete račun?" : "ste že registrirani?"}
        </button>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Pozabljeno geslo?</Link>
      </div>
    </section>
  );
}

export default Login;
